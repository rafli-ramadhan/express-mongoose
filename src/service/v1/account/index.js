const Account = require('../../../models/account')

module.exports = {
    // SELECT * FROM "accounts" WHERE "id" IN (...)
    TakeByID : async (accountID) => {
        await Account.findByID({ _id: accountID })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    // SELECT * FROM "accounts" WHERE "username" = '...'
    TakeByUsername : async (username) => {
        await Account.findByID({ username: username })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    Create : async (accountID) => {
        await Account.save({ _id: accountID })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    Update : (accountID, entity) => {
        Account.findOneAndUpdate({_id: accountID}, entity, { new: true })
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
    Delete : (accountID) => {
        Account.findByIdAndRemove({_id:  accountID})
        .then(data => {
            return data
        })
        .catch((error) => {
            return error
        });
    },
};