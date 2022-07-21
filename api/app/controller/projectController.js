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
        const projectId = parseInt(req.params.id, 10)
        try {
            const oneProject = await projectDatamapper.oneProject(projectId)
            return res.json(oneProject)
        } catch (error) {
            console.error(error);
        }
    },
    
}
module.exports = projectController ;