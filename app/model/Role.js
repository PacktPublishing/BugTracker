Ext.define('BugTracker.model.Role', {
  extend: 'Ext.data.Model',

  fields: [
  {
    name: 'id',
    type: 'int'
  },
  {
    name: 'name',
    type: 'string'
  }
  ],

  hasMany: {
    model: 'BugTracker.model.RolesResources',
    foreignKey: 'role_id',
    name: 'link'
  }
});