const pool = require('../db/connect');



const projectDatamapper = {

    async allProject (){
    const sql = 'SELECT * FROM project'
    try {
        const result = await pool.query(sql);
        return result.rows;
    } catch (error) {
        console.error(error);
    }
    },

    async oneProject(projectId){
    const sql = 'SELECT * FROM project WHERE id=$1'
    try {
        const result = await pool.query(sql, [projectId]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
    }
    },

    async create (body){
        const sql =  `INSERT INTO project (name, exerpt, description, start_date, end_date)VALUES($1, $2, $3, $4, $5)`
        body = { 
            name : body.name,
            exerpt : body.exerpt,
            description : body.description,
            start_date : body.start_date,
            end_date : body.end_date
        };
    try {
        const result = await pool.query(sql, [body.name, body.exerpt, body.description, body.start_date, body.end_date]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
    }
    },

    async destroy (projectID){
    const sql = `DELETE FROM project WHERE id=$1`;
    try {
        const result = await pool.query(sql, [projectID]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
    };
    },

    async update (){
    const sql = 'UPDATE project SET'
    try {
        const result = await pool.query(sql);
        return result.rows[0];
    } catch (error) {
        console.error(error);
    };
    }


};

module.exports = projectDatamapper;