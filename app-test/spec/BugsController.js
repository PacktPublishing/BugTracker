// Bugs Controller tests
describe('BugsController refs', function() {
	var ctrl, view;

	beforeEach(function(){
		var Application = BugTracker.getApplication();
		if (!ctrl) ctrl = Application.getController('Bug');
		if (!view) view = Ext.widget('bugmasterdetail', { renderTo: Ext.getBody() });
	});

	it('should ref detail', function() {
		var cmp = ctrl.getDetail();
        expect(cmp).toBeDefined();
        expect(cmp.xtype).toBe('bugdetail');
	});

	it('should ref master', function() {
		var cmp = ctrl.getMaster();
        expect(cmp).toBeDefined();
        expect(cmp.xtype).toBe('bugmaster');
	});

});
