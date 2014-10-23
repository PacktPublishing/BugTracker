var _ = require('lodash');

var Sequelize = require('sequelize'),
db = new Sequelize('BugTracker', 'root', null, { dialect: 'sqlite', storage: 'database.sqlite' });

var filter_attributes = function(attribute) {
  return (attribute != 'password');
};

var map_attributes = function() {
	var obj = new Object(),
	ctx = this;
	ctx.attributes.filter(filter_attributes).forEach(
		function(attr) {
			obj[attr] = ctx[attr];
		}
		);
	return obj;
}

var User = db.define('users', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		/*validate: {
			isEmail: true,
			len: [2,250]
		}*/
	},
	name_first: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			len: [0,50]
		}
	},
	name_last: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1,50]
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	group_id: {
		type: Sequelize.INTEGER,
		references: "groups",
		referencesKey: "id"
	}
}, {
	instanceMethods: {
		mapAttributes: map_attributes
	}
});

var Group = db.define('groups',{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: Sequelize.STRING,
    unique: true
 }
}, 
{
  instanceMethods: {
    mapAttributes: map_attributes
  }
});

Group.hasMany(User, { foreignKey: 'group_id' });


var Role = db.define('roles',
{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { type: Sequelize.STRING }
});

var Resource = db.define('resources',
{
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: { type: Sequelize.STRING }
});


var RolesRecources = db.define('roles_resources', { 
    role_id: { type: Sequelize.INTEGER, references: 'roles', referencesKey: 'id'},
    resource_id: { type: Sequelize.INTEGER, references: 'resources', referencesKey: 'id'}     
});

var UsersRoles = db.define('users_roles', { 
    user_id: { type: Sequelize.INTEGER, references: 'users', referencesKey: 'id'} , 
    role_id: { type: Sequelize.INTEGER, references: 'roles', referencesKey: 'id'}
});

User.hasMany(Role, {joinTableName: 'users_roles'});
Role.hasMany(Resource, { joinTableName: 'roles_resources'});

var requiredTextField = { 
	type: Sequelize.STRING,
	allowNull: false
};

var defaultTextField = {
	type: Sequelize.STRING,
	allowNull: true
};

var Menu = db.define('menus', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	parent_id: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	text: requiredTextField,
	tooltip: defaultTextField,
	actionId: defaultTextField,
	iconCls: defaultTextField,
  cls: defaultTextField,
  resource_id: {
		type: Sequelize.INTEGER,
		references: 'resources',
		referencesKey: 'id'
	}
});

Menu.belongsTo(Resource, { foreignKey: 'resource_id' });
Menu.belongsTo(Menu, { foreignKey: 'parent_id', model: Menu, as: 'Parent'});

// Bug system models

var lookups = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: Sequelize.STRING, 
    allowNull: false,
    unique: true 
  }
};

var lookup_options = {
  instanceMethods: {
    mapAttributes: map_attributes
  }
};

var Category = db.define('categories',lookups,lookup_options);
var Version = db.define('versions',_.extend(_.clone(lookups), {
  release_date: { 
    type: Sequelize.DATE,
    allowNull: true 
  }
}),lookup_options);
var Os = db.define('oses',lookups,lookup_options);
var Importance = db.define('importances',lookups,lookup_options);

var Bug = db.define('bugs', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  summary: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date_assigned: {
    type: Sequelize.DATE,
    allowNull: true
  },
  date_completed: {
    type: Sequelize.DATE,
    allowNull: true
  },
  reported_by_id: {
    type: Sequelize.INTEGER,
    references: "users",
    referencesKey: "id"
  },
  assigned_to_id: {
    type: Sequelize.INTEGER,
    references: "users",
    referencesKey: "id",
    allowNull: true
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: "categories",
    referencesKey: "id",
    allowNull: true
  },
  version_id: {
    type: Sequelize.INTEGER,
    references: "versions",
    referencesKey: "id",
    allowNull: true
  },
  os_id: {
    type: Sequelize.INTEGER,
    references: 'oses',
    referencesKey: 'id',
    allowNull: true
  },
  importance_id: {
    type: Sequelize.INTEGER,
    references: 'importances',
    referencesKey: 'id',
    allowNull: true
  },
  estimate: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
},lookup_options);

Bug.belongsTo(User, { foreignKey: 'assigned_to_id', as: 'assignedTo'});
Bug.belongsTo(User, { foreignKey: 'reported_by_id', as: 'reportedBy'});
Bug.belongsTo(Category, { foreignKey: 'category_id' });
Bug.belongsTo(Version, { foreignKey: 'version_id' });
Bug.belongsTo(Os, { foreignKey: 'os_id' });
Bug.belongsTo(Importance, { foreignKey: 'importance_id' });


var self = module.exports = {
  db : db,
  User: User,
  Group: Group,
  Resource: Resource,
  Role: Role,
  Menu: Menu,
  Bug: Bug, 
  Category: Category,
  Version: Version,
  Os: Os,
  Importance: Importance,
  UsersRoles: UsersRoles,
  RolesResources: RolesRecources
}
