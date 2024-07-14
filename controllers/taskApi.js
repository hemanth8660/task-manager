const tasks = require('../task.json').tasks;

const getTasksByPriority = async (req, res) => {
    const priorityTasks = tasks.filter(task => task.priority === req.params.level);
     return res.status(200).json({ task: priorityTasks });
 };

const getTaskById = async (req, res) => {
    const ind = getIndex(req.params.id);
    if (ind === -1) {
        res.status(401);
        return res.json({err: 'Id Not Found!'})
    }

    res.status(200);
    return res.json({ task: tasks[ind]});
};

const getAllTasks = async (req, res) => {
    res.status(200);
    return res.json({ tasks: tasks});
};

const getTask = async (req, res) => {
    const completionStatus = req.query.status;
    let filteredTasks = tasks.filter(t => String(t.completed) === completionStatus); 
    filteredTasks.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    
    res.status(200);
    return res.json({ tasks: filteredTasks});
}

const createTask = async(req, res) => {
    // If any key is missing in the req body, by default assigning empty string  
    const { title= "", description= "", completed= ""} = req.body;

    if (!(title && title.length)) {
        res.status(401);
        return res.json({ err: 'Title Should Not Be Empty' });
    }
    if (!(description && description.length)) {
        res.status(401);
        return res.json({ err: 'Description Should Not Be Empty' });
    }

    const newId = tasks.length + 1;
    tasks.push({
        id: newId,
        title,
        description,
        completed,
        createdAt: new Date()
    });

    res.status(200);
    return res.json({ id: newId });
};

const setPriority = async (req, res) => {
    const ind = getIndex(req.query.id);
    if(ind === -1) {
        res.status(400);
        return res.json({ err: 'Id Not Found'});
    }
    tasks[ind].priority = req.query.priority;

    res.status(200);
    return res.json({ task: tasks[ind]});
};

const updateTask = async (req, res) => {
    const ind = getIndex(req.params.id);
    if (ind === -1) {
        req.body.id = tasks.length + 1;
        tasks.push(req.body);
    }
    const reqBody = req.body;
    // overrides existsing data with updated data;
    const obj = { ...tasks[ind], ...reqBody }; 
    tasks[ind] = obj;

    res.status(200);
    return res.json({ id: tasks[ind].id});
};


const deleteTask = async(req,res) => {
    const ind = getIndex(req.params.id);
    if (ind === -1) {
        res.status(401);
        return res.json({err: 'Requested Id Not Found!'})
    }

    tasks.splice(ind, 1);
    res.status(200);
    return res.json({ tasks: tasks });
};

function getIndex (reqId) {
    const ind = tasks.findIndex(task => task['id'] === parseInt(reqId));
    return ind;
}

module.exports = {
    getTasksByPriority,
    getTaskById,
    getAllTasks,
    getTask,
    createTask,
    setPriority,
    updateTask,
    deleteTask
}
