const projectDatamapper = require ('../datamapper/projectDatamapper');



const projectController ={
    async fetchAllProject(_,res) {
        try {
            const allProject = await projectDatamapper.allProject();
            return res.json(allProject);
        } catch (error) {
            console.error(error);
        }
    },
    
    async fetchOneProject(req, res){

        const projectId = parseInt(req.params.id, 10);

        try {
            const oneProject = await projectDatamapper.oneProject(projectId);
            return res.json(oneProject)
        } catch (error) {
            console.error(error);
        };
    },

    async oneProjectByCustomerConnected(req, res){

        const projectId = req.params.id;

        try {
            const oneProjectByCustomerConnected = await projectDatamapper.oneProjectByCustomerConnected(projectId);
            return res.json(oneProjectByCustomerConnected)
        } catch (error) {
            console.error(error);
        };
    },
    
    async creatProject (req, res) {
        const body = req.body
        try {
            const exist = await projectDatamapper.verif(body.name)
            if(exist){
                res.json({"message":"Cenom existe déja"})
            }
            const create = await projectDatamapper.create(body);
            return res.json(create);
        } catch (error) {
            console.error(error);
        };
    },

    async deleteProject (req, res) {

        const projectId = parseInt(req.params.id, 10);

        try {
            const destroy = await projectDatamapper.destroy(projectId);
            return res.json(destroy);
        } catch (error) {
            console.error(error);
        };
    },

    async updateProject(req, res) {
		const body = req.body;
		const projectId = req.params.id;
		try {
			const update = await projectDatamapper.update(body, projectId);
			return res.json(update);
		} catch (error) {
			console.error(error);
		}
	},

    async fetchAllProjectHome(_,res) {
        try {
            const allProject = await projectDatamapper.allProjectLink();
            return res.json(allProject);
        } catch (error) {
            console.error(error);
        }
    },
};
module.exports = projectController ;