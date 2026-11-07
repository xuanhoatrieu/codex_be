/* Pure rules. No network, Google services or secrets in this file. */
var Domain = (function () {
  'use strict';
  var CLOSED = ['CLOSED'];
  var OUTCOMES = ['APPROVED', 'REFUSED', 'WITHDRAWN'];
  var STATUSES = ['UNVERIFIED', 'MERGED', 'RECEIVED', 'TRANSFER_WAIT', 'PROCESSING', 'RESULT_READY', 'RETURN_WAIT', 'FRONT_READY', 'CLOSED'];
  function fail(message) { throw new Error(message); }
  function text(value, label, max) {
    var v = String(value == null ? '' : value).trim();
    if (!v || v.length > (max || 500)) fail(label + ' không hợp lệ.');
    return v;
  }
  function date(value, optional) {
    if (!value && optional) return '';
    if (typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)) fail('Ngày phải có dạng YYYY-MM-DD.');
    var d = new Date(value + 'T00:00:00Z');
    if (!isFinite(d.getTime()) || d.toISOString().slice(0, 10) !== value) fail('Ngày không tồn tại.');
    return value;
  }
  function normalizeCode(value) { return String(value || '').trim().replace(/\s+/g, '').toUpperCase(); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function hasRole(user, roles) { return roles.indexOf(user.role) >= 0; }
  function requireRole(user, roles) { if (!hasRole(user, roles)) fail('Tài khoản không có quyền thực hiện thao tác này.'); }
  function find(state, table, id) {
    return (state[table] || []).find(function (x) { return x.id === id; });
  }
  function activeUser(state, email) {
    var u = (state.users || []).find(function (x) { return x.email === String(email || '').toLowerCase() && x.active === true; });
    if (!u) fail('Tài khoản chưa được quản trị viên phân quyền.');
    return u;
  }
  function visible(c, user, state) {
    return hasRole(user, ['ADMIN', 'MANAGER', 'FRONT']) || c.owner === user.email ||
      (state.tasks || []).some(function (t) { return t.caseId === c.id && t.assignee === user.email; }) ||
      (state.transfers || []).some(function (t) { return t.caseId === c.id && (t.to === user.email || t.from === user.email); });
  }
  function canHandle(c, user) {
    if (!(hasRole(user, ['ADMIN', 'MANAGER']) || c.owner === user.email)) fail('Chỉ người đang phụ trách hoặc quản lý được cập nhật hồ sơ.');
  }
  function daysBetween(a, b) { return Math.floor((new Date(a + 'T00:00:00Z') - new Date(b + 'T00:00:00Z')) / 86400000); }
  function dueState(c, today) {
    if (['UNVERIFIED','MERGED'].indexOf(c.status)>=0 || !c.due) return 'UNKNOWN';
    if (CLOSED.indexOf(c.status) >= 0) return 'CLOSED';
    var n = daysBetween(c.due, today);
    return n < 0 ? 'OVERDUE' : n === 0 ? 'TODAY' : n <= 3 ? 'SOON' : 'ON_TIME';
  }
  function workingDue(start, days, holidays, includeStart) {
    date(start); if (!Number.isInteger(days) || days < 1 || days > 1000) fail('Số ngày làm việc không hợp lệ.');
    var d = new Date(start + 'T00:00:00Z'), n = 0;
    if (!includeStart) d.setUTCDate(d.getUTCDate() + 1);
    while (true) {
      var iso = d.toISOString().slice(0, 10), day = d.getUTCDay();
      var override = (holidays || []).find(function (x) { return x.date === iso; });
      var work = override ? override.working === true : day !== 0 && day !== 6;
      if (work && ++n === days) return iso;
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }
  function decide(state, user, action, input, ctx) {
    var p = clone(input || {}), changes = [], now = ctx.now, today = ctx.today;
    function put(table, row) { changes.push({table: table, row: row}); return row; }
    function uid(prefix) { return prefix + '_' + ctx.id(); }
    function getCase() {
      var item = find(state, 'cases', p.caseId); if (!item || !visible(item, user, state)) fail('Không tìm thấy hồ sơ được phép xem.');
      if(item.status==='MERGED')fail('Bản ghi đã hợp nhất vào '+item.mergedInto+'. Mở hồ sơ đích để thao tác.');
      if (item.version !== Number(p.version)) fail('Hồ sơ vừa thay đổi. Hãy tải lại trước khi cập nhật.');
      return clone(item);
    }
    function saveCase(c) { c.version += 1; c.updatedAt = now; put('cases', c); }
    function procedure(id) {
      var proc = find(state, 'procedures', id); if (!proc || proc.active !== true) fail('Chưa chọn thủ tục trong danh mục đang áp dụng.');
      return proc;
    }
    function documentEvidence() { return text(p.evidence, 'Căn cứ/văn bản', 2000); }
    function nonFuture(v) { date(v); if (v > today) fail('Ngày sự kiện thực tế không được ở tương lai.'); return v; }
    var c;
    if (action === 'create') {
      requireRole(user, ['ADMIN', 'FRONT']); procedure(p.procedure);
      var code = normalizeCode(p.code);
      if (code && !/^[A-Z0-9][A-Z0-9.\/-]{4,99}$/.test(code)) fail('Mã hồ sơ không hợp lệ.');
      if (code && (state.cases || []).some(function (x) { return normalizeCode(x.code) === code; })) fail('Mã hồ sơ đã tồn tại. Hãy mở hồ sơ cũ.');
      var received = nonFuture(p.received), due = date(p.due, true);
      if (due && due < received) fail('Hạn hẹn không được trước ngày tiếp nhận.');
      c = {id: uid('HS'), code: code, name: text(p.name, 'Họ tên'), landUser: String(p.landUser || ''), phone: String(p.phone || '').trim(), address: String(p.address || ''), procedure: p.procedure,
        received: received, originalDue: due, due: due, status: 'RECEIVED', owner: user.email, outcome: '', resultDate: '', returnDate: '', closedDate: '',
        createdAt: now, updatedAt: now, version: 1, verified: true, source: 'MANUAL', evidence: text(p.evidence,'Căn cứ tiếp nhận',2000), note: String(p.note || '')};
      if (c.phone && !/^\+?[0-9 .()-]{8,20}$/.test(c.phone)) fail('Số điện thoại không hợp lệ.');
      put('cases', c);
      (p.parcels || []).forEach(function (x) {
        if (x.area && (!isFinite(Number(x.area)) || Number(x.area) <= 0)) fail('Diện tích phải là số dương.');
        put('parcels', {id: uid('TD'), caseId: c.id, plot: String(x.plot || ''), map: String(x.map || ''), area: String(x.area || ''), village: String(x.village || ''), commune: String(x.commune || ''), serial: String(x.serial || ''), source: 'MANUAL'});
      });
    } else if (action === 'handoff' || action === 'return_result') {
      c = getCase(); canHandle(c, user);
      if (action === 'handoff' && ['RECEIVED', 'PROCESSING'].indexOf(c.status) < 0) fail('Hồ sơ chưa ở bước có thể bàn giao chuyên môn.');
      if (action === 'return_result' && c.status !== 'RESULT_READY') fail('Chưa có kết quả chuyên môn để bàn giao.');
      var target = activeUser(state, p.to);
      if (target.email === user.email) fail('Người nhận phải khác người giao.');
      if (action === 'handoff' && !hasRole(target, ['SPECIALIST', 'MANAGER'])) fail('Chọn cán bộ chuyên môn hoặc quản lý nhận hồ sơ.');
      if (action === 'return_result' && target.role !== 'FRONT') fail('Chọn cán bộ một cửa nhận kết quả.');
      if (action === 'return_result' && (state.tasks || []).some(function(t) {return t.caseId === c.id && ['DONE','CANCELLED'].indexOf(t.status) < 0;})) fail('Còn công việc chưa kết thúc.');
      var tr = put('transfers', {id: uid('BG'), batchId: String(p.batchId || uid('DOT')), caseId: c.id, from: user.email, to: target.email,
        kind: action === 'handoff' ? 'SPECIALIST' : 'FRONT', sentAt: now, acceptedAt: '', previousStatus: c.status, status: 'PENDING', note: text(p.note, 'Nội dung bàn giao', 3000)});
      c.status = action === 'handoff' ? 'TRANSFER_WAIT' : 'RETURN_WAIT'; c.pendingTransfer = tr.id; saveCase(c);
    } else if (action === 'accept_transfer') {
      c = getCase(); var transfer = clone(find(state, 'transfers', c.pendingTransfer) || {});
      if (!transfer.id || transfer.status !== 'PENDING') fail('Không có lượt bàn giao đang chờ.');
      if (transfer.to !== user.email) fail('Chỉ người nhận được chỉ định được xác nhận nhận.');
      transfer.status = 'ACCEPTED'; transfer.acceptedAt = now; put('transfers', transfer);
      c.owner = user.email; c.status = transfer.kind === 'FRONT' ? 'FRONT_READY' : 'PROCESSING'; c.pendingTransfer = ''; saveCase(c);
    } else if (action === 'reject_transfer') {
      c = getCase(); var rejected = clone(find(state, 'transfers', c.pendingTransfer) || {});
      if (!rejected.id || rejected.status !== 'PENDING' || rejected.to !== user.email) fail('Không có bàn giao chờ nhận cho tài khoản này.');
      rejected.status = 'REJECTED'; rejected.note += '\nTừ chối nhận: ' + text(p.reason, 'Lý do', 2000); put('transfers', rejected);
      c.status = rejected.previousStatus; c.pendingTransfer = ''; saveCase(c);
    } else if (action === 'assign_task') {
      c = getCase(); requireRole(user,['ADMIN','MANAGER','SPECIALIST']); canHandle(c, user);
      if (['RECEIVED', 'PROCESSING'].indexOf(c.status) < 0) fail('Không thể giao việc tại bước hiện tại.');
      var assignee = activeUser(state, p.assignee);
      if (!hasRole(assignee, ['SPECIALIST', 'MANAGER'])) fail('Người thực hiện phải là cán bộ chuyên môn.');
      var taskDue = date(p.due); if (taskDue < today) fail('Hạn công việc mới không được ở quá khứ.');
      put('tasks', {id: uid('CV'), caseId: c.id, title: text(p.title, 'Tên công việc'), assignee: assignee.email, assignedBy: user.email,
        assignedAt: now, due: taskDue, status: 'TODO', completedAt: '', blocker: '', nextStep: '', result: '', updatedAt: now}); saveCase(c);
    } else if (action === 'update_task') {
      c = getCase(); var task = clone(find(state, 'tasks', p.taskId) || {});
      if (!task.id || task.caseId !== c.id) fail('Không tìm thấy công việc.');
      if (task.assignee !== user.email && !hasRole(user, ['ADMIN', 'MANAGER'])) fail('Chỉ người được giao hoặc quản lý được cập nhật công việc.');
      if (['TODO', 'DOING', 'BLOCKED', 'DONE', 'CANCELLED'].indexOf(p.status) < 0) fail('Trạng thái công việc không hợp lệ.');
      if (['CLOSED','UNVERIFIED','RESULT_READY','RETURN_WAIT','FRONT_READY'].indexOf(c.status) >= 0) fail('Không được sửa công việc tại bước hiện tại.');
      task.status = p.status; task.blocker = p.status === 'BLOCKED' ? text(p.blocker, 'Lý do đang chờ') : '';
      task.nextStep = String(p.nextStep || ''); task.result = p.status === 'DONE' ? text(p.result, 'Kết quả công việc', 3000) : String(p.result || '');
      if (p.status === 'CANCELLED') task.result = text(p.result, 'Lý do hủy công việc', 3000);
      task.completedAt = ['DONE', 'CANCELLED'].indexOf(p.status) >= 0 ? now : ''; task.updatedAt = now; put('tasks', task); saveCase(c);
    } else if (action === 'record_result') {
      c = getCase(); canHandle(c, user);
      if (c.status !== 'PROCESSING') fail('Hồ sơ phải đang xử lý chuyên môn.');
      if (OUTCOMES.indexOf(p.outcome) < 0) fail('Chọn loại kết quả chính thức.');
      if ((state.tasks || []).some(function (t) { return t.caseId === c.id && ['DONE', 'CANCELLED'].indexOf(t.status) < 0; })) fail('Cần hoàn thành hoặc hủy có lý do các công việc đang mở.');
      c.resultDate = nonFuture(p.resultDate); if (c.resultDate < c.received) fail('Ngày kết quả trước ngày tiếp nhận.');
      c.outcome = p.outcome; c.resultRef = documentEvidence(); c.status = 'RESULT_READY'; saveCase(c);
    } else if (action === 'close') {
      c = getCase(); requireRole(user, ['ADMIN', 'FRONT']); canHandle(c, user);
      if (c.status !== 'FRONT_READY') fail('Một cửa chưa xác nhận nhận kết quả.');
      c.returnDate = nonFuture(p.returnDate); if (c.returnDate < c.resultDate) fail('Ngày trả trước ngày có kết quả.');
      c.returnEvidence = documentEvidence(); c.closedDate = c.returnDate; c.status = 'CLOSED'; saveCase(c);
    } else if (action === 'reopen') {
      c = getCase(); requireRole(user, ['ADMIN', 'MANAGER']);
      if (c.status !== 'CLOSED') fail('Chỉ mở lại hồ sơ đã đóng.');
      text(p.reason, 'Lý do mở lại'); c.status = 'RECEIVED'; c.owner = activeUser(state, p.owner).email;
      c.closedDate = ''; c.returnDate = ''; c.resultDate = ''; c.outcome = ''; c.resultRef = ''; saveCase(c);
    } else if (action === 'adjust_due') {
      c = getCase(); requireRole(user, ['ADMIN', 'MANAGER']);
      if (c.status === 'CLOSED') fail('Không điều chỉnh hạn hồ sơ đã đóng.');
      var adjusted = date(p.due); if (adjusted < c.received) fail('Hạn mới trước ngày tiếp nhận.');
      c.due = adjusted; c.dueReason = text(p.reason, 'Lý do điều chỉnh'); c.dueEvidence = documentEvidence(); saveCase(c);
    } else if (action === 'verify_case') {
      c = getCase(); requireRole(user, ['ADMIN', 'FRONT']);
      if (c.status !== 'UNVERIFIED') fail('Hồ sơ không ở hàng chờ xác minh.');
      procedure(p.procedure); c.procedure = p.procedure; c.received = nonFuture(p.received); c.due = date(p.due, true);
      if(p.code!==undefined){var verifiedCode=normalizeCode(p.code);if(verifiedCode&&(state.cases||[]).some(function(x){return x.id!==c.id&&normalizeCode(x.code)===verifiedCode;}))fail('Mã đã có ở hồ sơ khác. Đối soát/hợp nhất trước.');c.code=verifiedCode;}
      if(p.name!==undefined)c.name=text(p.name,'Họ tên');if(p.phone!==undefined)c.phone=String(p.phone);if(p.address!==undefined)c.address=String(p.address);
      if (c.due && c.due < c.received) fail('Hạn hẹn trước ngày nhận.');
      c.originalDue = c.due; c.owner = user.email; c.evidence = documentEvidence(); c.verified = true; c.status = 'RECEIVED';
      if(p.legacyClosed===true){
        c.resultDate=nonFuture(p.resultDate);c.returnDate=nonFuture(p.returnDate);
        if(c.resultDate<c.received||c.returnDate<c.resultDate)fail('Các mốc nhận/kết quả/trả không đúng thứ tự.');
        if(OUTCOMES.indexOf(p.outcome)<0)fail('Chọn kết quả lịch sử.');
        c.outcome=p.outcome;c.closedDate=c.returnDate;c.status='CLOSED';
      }
      saveCase(c);
    } else if (action === 'merge_legacy') {
      c=getCase();requireRole(user,['ADMIN']);
      var targetCase=clone(find(state,'cases',p.targetId)||{});
      if(c.status!=='UNVERIFIED'||targetCase.status!=='UNVERIFIED'||targetCase.id===c.id)fail('Chỉ hợp nhất hai hồ sơ lịch sử chưa xác minh khác nhau.');
      if(targetCase.version!==Number(p.targetVersion))fail('Hồ sơ đích vừa thay đổi. Hãy tải lại.');
      if(c.code&&targetCase.code&&c.code!==targetCase.code)fail('Hai mã DVC khác nhau: giữ hai hồ sơ và đối soát liên kết, không hợp nhất.');
      text(p.reason,'Lý do và căn cứ hợp nhất');
      if(!targetCase.code&&c.code){targetCase.code=c.code;c.code='';}
      ['parcels','reviews','documents','payments'].forEach(function(table){(state[table]||[]).filter(function(x){return x.caseId===c.id;}).forEach(function(x){var moved=clone(x);moved.caseId=targetCase.id;put(table,moved);});});
      c.status='MERGED';c.mergedInto=targetCase.id;saveCase(c);saveCase(targetCase);
    } else if (action === 'save_user') {
      requireRole(user, ['ADMIN']); var email = text(p.email, 'Email').toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail('Email không hợp lệ.');
      if (['ADMIN', 'MANAGER', 'FRONT', 'SPECIALIST'].indexOf(p.role) < 0) fail('Vai trò không hợp lệ.');
      var existing = (state.users || []).find(function (x) { return x.email === email; });
      if (existing && existing.role === 'ADMIN' && existing.active && (p.role !== 'ADMIN' || !p.active) &&
        (state.users || []).filter(function (x) { return x.role === 'ADMIN' && x.active; }).length <= 1) fail('Phải giữ ít nhất một quản trị viên hoạt động.');
      put('users', {id: existing ? existing.id : uid('ND'), email: email, name: text(p.name, 'Tên cán bộ'), role: p.role, active: p.active === true, notifications: p.notifications === true});
    } else if (action === 'save_procedure') {
      requireRole(user, ['ADMIN']); put('procedures', {id: text(p.id, 'Mã thủ tục', 100), name: text(p.name, 'Tên thủ tục'), active: p.active === true, rule: String(p.rule || '')});
    } else if (action === 'save_holiday') {
      requireRole(user, ['ADMIN']); var hd = date(p.date); put('holidays', {id: hd, date: hd, working: p.working === true, note: text(p.note, 'Ghi chú lịch')});
    } else if (action === 'add_document') {
      c = getCase(); canHandle(c, user);
      put('documents', {id: uid('TL'), caseId: c.id, fileId: text(p.fileId, 'Drive file ID', 200), name: text(p.name, 'Tên tài liệu'), type: text(p.type, 'Loại tài liệu'), hash: String(p.hash || ''), createdAt: now}); saveCase(c);
    } else if (action === 'add_parcel') {
      c=getCase();canHandle(c,user);
      if(['CLOSED','UNVERIFIED'].indexOf(c.status)>=0&&!hasRole(user,['ADMIN','MANAGER']))fail('Thửa hồ sơ lịch sử/đã đóng cần quản lý xác nhận.');
      if(p.area&&(!isFinite(Number(p.area))||Number(p.area)<=0))fail('Diện tích phải là số dương.');
      put('parcels',{id:uid('TD'),caseId:c.id,plot:text(p.plot,'Số thửa'),map:text(p.map,'Số tờ'),area:String(p.area||''),village:String(p.village||''),commune:String(p.commune||''),serial:String(p.serial||''),source:documentEvidence()});saveCase(c);
    } else if (action === 'add_payment') {
      c = getCase(); requireRole(user, ['ADMIN', 'FRONT']);
      var receipt = text(p.receipt, 'Số biên lai');
      if ((state.payments || []).some(function (x) { return x.caseId === c.id && x.receipt === receipt; })) fail('Biên lai này đã được ghi.');
      var amount = Number(p.amount); if (!Number.isSafeInteger(amount) || amount <= 0) fail('Số tiền phải là số nguyên VND dương.');
      put('payments', {id: uid('TT'), caseId: c.id, receipt: receipt, date: nonFuture(p.date), amount: amount, type: text(p.type, 'Loại khoản thu'), evidence: documentEvidence(), createdAt: now}); saveCase(c);
    } else fail('Thao tác chưa được hỗ trợ.');
    return {changes: changes, result: {caseId: c ? c.id : '', message: 'Đã ghi nhận và lưu lịch sử.'}};
  }
  function apply(state, changes) {
    changes.forEach(function (ch) { var rows = state[ch.table] || (state[ch.table] = []); var i = rows.findIndex(function (x) { return x.id === ch.row.id; }); if (i < 0) rows.push(clone(ch.row)); else rows[i] = clone(ch.row); });
    return state;
  }
  function dashboard(state, today, from, to) {
    date(today); date(from); date(to); if (from > to) fail('Kỳ báo cáo không hợp lệ.');
    var cases = state.cases || [], tasks = state.tasks || [], transfers = state.transfers || [], events = state.events || [];
    var verified = cases.filter(function (c) { return ['UNVERIFIED','MERGED'].indexOf(c.status)<0; });
    var counts = {total: cases.filter(function(c){return c.status!=='MERGED';}).length, unverified: cases.filter(function(c){return c.status==='UNVERIFIED';}).length, active: 0, overdue: 0, soon: 0, today: 0, unknownDue: 0, waitingTransfer: 0, readyReturn: 0, closed: 0};
    verified.forEach(function (c) { var due = dueState(c, today); if (c.status === 'CLOSED') counts.closed++; else { counts.active++; if (due === 'OVERDUE') counts.overdue++; if (due === 'TODAY') counts.today++; if (due === 'SOON') counts.soon++; if (due === 'UNKNOWN') counts.unknownDue++; }
      if (['TRANSFER_WAIT', 'RETURN_WAIT'].indexOf(c.status) >= 0) counts.waitingTransfer++; if (c.status === 'FRONT_READY') counts.readyReturn++;
    });
    var staff = (state.users || []).filter(function (u) { return u.active; }).map(function (u) {
      var owned = verified.filter(function (c) { return c.owner === u.email && c.status !== 'CLOSED'; });
      var mine = tasks.filter(function (t) { return t.assignee === u.email; });
      var done = mine.filter(function (t) { return t.status === 'DONE' && t.completedAt.slice(0, 10) >= from && t.completedAt.slice(0, 10) <= to; });
      var open = mine.filter(function (t) { return ['DONE', 'CANCELLED'].indexOf(t.status) < 0; });
      return {email: u.email, name: u.name, role: u.role, cases: owned.length, open: open.length, blocked: open.filter(function (t) { return t.status === 'BLOCKED'; }).length,
        overdue: open.filter(function (t) { return t.due < today; }).length, done: done.length, onTime: done.filter(function (t) { return t.completedAt.slice(0, 10) <= t.due; }).length,
        waitingReceive: transfers.filter(function (t) { return t.to === u.email && t.status === 'PENDING'; }).length,
        staleCases: owned.filter(function (c) { return daysBetween(today, c.updatedAt.slice(0, 10)) >= 7; }).length};
    });
    // Event-time movements only. Migrated cases do not invent historical intake/closure events.
    var period = {intakes: 0, closed: 0, reopened: 0, verifiedLegacy: 0, verifiedOpen:0, results: 0, returned: 0, taskCompletions: 0};
    events.forEach(function (e) { if (e.at.slice(0, 10) < from || e.at.slice(0, 10) > to) return;
      if (e.action === 'create') period.intakes++; if (e.action === 'close') { period.closed++; period.returned++; }
      if (e.action === 'reopen') period.reopened++; if (e.action === 'verify_case') {period.verifiedLegacy++;if(!e.input||e.input.legacyClosed!==true)period.verifiedOpen++;} if (e.action === 'record_result') period.results++;
      if (e.action === 'update_task' && e.input && e.input.status === 'DONE') period.taskCompletions++;
    });
    var before={},end={};
    events.forEach(function(e){(e.changes||[]).filter(function(ch){return ch.table==='cases';}).forEach(function(ch){if(e.at.slice(0,10)<from)before[ch.row.id]=ch.row;if(e.at.slice(0,10)<=to)end[ch.row.id]=ch.row;});});
    function openCount(items){return Object.keys(items).filter(function(id){return ['UNVERIFIED','MERGED','CLOSED'].indexOf(items[id].status)<0;}).length;}
    period.opening=openCount(before);period.ending=openCount(end);
    period.reconciled=period.opening+period.intakes+period.reopened+period.verifiedOpen-period.closed===period.ending;
    return {counts: counts, staff: staff, period: period, from: from, to: to, today: today, note: 'Hồ sơ lịch sử chưa xác minh không nằm trong thống kê xử lý chính thức. Số hoàn thành công việc theo trạng thái hiện tại; lượt hoàn thành theo nhật ký được báo riêng.'};
  }
  return {decide: decide, apply: apply, dashboard: dashboard, dueState: dueState, workingDue: workingDue, visible: visible, activeUser: activeUser, normalizeCode: normalizeCode, date: date, statuses: STATUSES};
})();
