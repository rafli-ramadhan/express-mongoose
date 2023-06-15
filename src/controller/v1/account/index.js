const Account = require('../../service/account')

module.exports = {
    Get : async (req, res) => {
        try {
            const users = await Account.TakeById(req.params.id)
            return res.status(200).send(users)
        }
        catch (error) {
            return res.status(500).send({
                message: error.message || 'some error ocurred while retrieving data.',
            });
        }
    },
    GetByIDs: async (req, res) => {
        try {
            const user = await Account.FindById(req.params.id)
            if (!user) throw createError.NotFound('Account not found')
            return res.status(200).send(user);
        }
        catch (err) {
            if(err.kind === 'ObjectId') 
                return res.status(404).send({ message: 'data not found with id ' + req.params.id });
            return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
        }
    },
    Update : (req, res) => {
        Account.TakeById(req.params.id)
        .then((currentData) => {
            let {newName, newEmail, newPassword, newGender, newRole, newUpdatedScreeningResult} = '';
            if (!req.body.name) { 
                newName = currentData.name
            }
            if (!req.body.email) { 
                newEmail = currentData.email
            }
            if (!req.body.password) { 
                newPassword = currentData.password
            }
            if (!req.body.gender) { 
                newGender = currentData.gender
            }
            if (!req.body.role) { 
                newRole = currentData.role
            }
            if (req.body.name) { 
                newName = req.body.name
            }
            if (req.body.email) { 
                newEmail = req.body.email
            }
            if (req.body.password) { 
                newPassword = req.body.password
            }
            if (req.body.gender) { 
                newGender = req.body.gender
            }
            if (req.body.role) { 7
                newRole = req.body.role
            }

            const newData = Account({
                name: newName,
                email: newEmail,
                password: newPassword,
                gender: newGender,
                role: newRole,
                updatedScreeningResult: newUpdatedScreeningResult,
                _id: req.params.id
            });

            Account.Update(req.param.id, newData)
            .then((updatedData) => {
                return res.status(200).send(updatedData);
            }).catch((err) => {
                if(err.kind === 'Object_id')
                    return res.status(404).send({ message: 'data not found with _id ' + req.params._id, });
                return res.status(500).send({ message: 'error updating data with _id ' + req.params._id, });
            });
        })
        .catch((err) => {
            if(err.kind === 'ObjectId')
                return res.status(404).send({ message: 'data not found with id ' + req.params.id });
            return res.status(500).send({ message: 'error retrieving data with id ' + req.params.id });
        });
    },
    Delete : (req, res) => {
        try {
            Account.Delete(req.param.id).then(() => {
                return res.status(200).send({ message: 'data deleted successfully!' });
            })
        }
        catch (err) {
            if(err.kind === 'ObjectId' || err.name === 'NotFound')
                return res.status(404).send({ message: 'data not found with id ' + req.params.id, });
            return res.status(500).send({ message: 'could not delete data with id ' + req.params.id, });
        };
    }
};
