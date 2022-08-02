const jobDatamapper = require('../datamapper/jobDatamapper');

const jobController ={


    async addJobProject (req, res, next) {
        try {
            const projectId= req.params.id;
            const jobName = req.body.job
            const jobfinded = await jobDatamapper.getJobId(jobName);
            const result = await jobDatamapper.addJob (projectId ,jobfinded.id);
            if (result === null || result === undefined){
                return res.status(404).json({ message: "This job does not exists !"});
            };

            return res.status(204).json(result);

        } catch (error) {

        next(error);

        };
    },

    async deleteJobProject (req, res, next) {
        try {
            const tableId = req.body.id_project_has_job;
            const result = await jobDatamapper.deleteJobProject (tableId);
            if (result === null || result === undefined){
                return res.status(404).json({ message: "This job does not exists !"});
            };

            return res.status(204).json(result);

        } catch (error) {

        next(error);

        };
    },
        

    async addJobUser (req, res, next) {
        try {
            const userId= req.params.id;
            const jobName = req.body.job
            console.log('ici 2');
            const jobfinded = await jobDatamapper.getJobId(jobName);
            const result = await jobDatamapper.addJobUser (userId ,jobfinded.id);
            if (result === null || result === undefined){
                return res.status(404).json({ message: "This job does not exists !"});
            };

            return res.status(204).json(result);;

        } catch (error) {

        next(error);

        };
    },

    async deleteJobUser (req, res, next) {
        try {
            const userId= req.params.id;
            const result = await jobDatamapper.deleteJobUser(userId);
            if (result === null || result === undefined){
                return res.status(404).json({ message: "This job does not exists !"});
            };

            return res.status(204).json(result);

        } catch (error) {

            next(error);

        };
    }

};
module.exports = jobController;