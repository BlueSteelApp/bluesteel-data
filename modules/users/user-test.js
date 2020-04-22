const assert=require('assert');
const {buildFromEnv} = require('../../shared/module-wrapper');

describe('users-test', function() {
	let PermissionSet,User,UserPermissionSet,PermissionSetPermission;
	let moduleWrapper,sqlWrapper;

	before('get moduleWrapper', async function() {
		moduleWrapper = await buildFromEnv();
		sqlWrapper = moduleWrapper.sqlWrapper;
		PermissionSet=sqlWrapper.getModel('PermissionSet');
		User=sqlWrapper.getModel('User');
		UserPermissionSet=sqlWrapper.getModel('UserPermissionSet');
		PermissionSetPermission=sqlWrapper.getModel('PermissionSetPermission');
	});

	beforeEach('delete old data', async function() {
		await PermissionSet.destroy({truncate:true});
		await User.destroy({truncate:true});
		await UserPermissionSet.destroy({truncate:true});
		await PermissionSetPermission.destroy({truncate:true});
	});

	after('shutdown', async function() {
		await moduleWrapper.close();
	});

	describe('PermissionSetPermission', function() {
		describe('creation', function() {
			it('should create multiple', async function() {
				const permissionSet = await PermissionSet.create({id:1,label:"Test Set", description:"A test permission set"});
				const permission = await PermissionSetPermission.create({permission_set_id:1, module: 'test', value:"read"});
				await PermissionSetPermission.create({permission_set_id:1, module: 'other-test', value:"read"});

				const perms = await permissionSet.getPermissionSetPermission();
				// console.log(perms);
				assert.equal(perms[0].id,permission.id);

				const set = await permission.getPermissionSet();
				assert.equal(set.id, permissionSet.id);
			});

			it('should fail is permission set does not exist', async function() {
				await assert.rejects(async () => {
					await PermissionSetPermission.create({permission_set_id:1,module:'test',value:'readonly'});
				}, {
					message: "Validation error: PermissionSet with id 1 does not exist"
				});
			})
		});
	});

	describe('UserPermissionSet', function() {
		describe('creation', function() {
			it('should succeed if the user and permission set exist', async function() {
				// given
				await User.create({id:1, label:'Zoolander Marketing',external_source:'test',external_id:1});
				// then should work
				await UserPermissionSet.create({id: 1, user_id: 1, permission_set_id:1});

				const set = await UserPermissionSet.findByPk(1);
				await set.getUser();
			});

			it('should fail if the user does not exist', async function() {
				await assert.rejects(async () => {
					await UserPermissionSet.create({id: 1, user_id: 1, permission_set_id:1});
				}, {
					message: "Validation error: User with id 1 does not exist"
				});
			});
		});
	});
});
