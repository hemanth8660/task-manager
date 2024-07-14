const express = require('express');
const app = express();
const tasks = require('./task.json').tasks;
const PORT = 3000;
app.use(express.json());

app.get('/tasks/priority/:level', (req, res) => {
    const priorityTasks = tasks.filter(task => task.priority === req.params.level);
     return res.status(200).json({ task: priorityTasks });
 });

app.get('/tasks/:id', (req, res) => {
    const ind = getIndex(req.params.id);
    if (ind === -1) {
        res.status(401);
        return res.json({err: 'Id Not Found!'})
    }

    res.status(200);
    return res.json({ task: tasks[ind]});
});

app.get('/tasks', (req, res) => {

    res.status(200);
    return res.json({ tasks: tasks});
});

app.get('/filterTask', (req, res) => {
    const completionStatus = req.query.status;
    let filteredTasks = tasks.filter(t => String(t.completed) === completionStatus); 
    filteredTasks.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    
    res.status(200);
    return res.json({ tasks: filteredTasks});
})

app.post('/tasks', (req, res) => {
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
});

app.put('/tasks/priority', (req, res) => {
    const ind = getIndex(req.query.id);
    if(ind === -1) {
        res.status(400);
        return res.json({ err: 'Id Not Found'});
    }
    tasks[ind].priority = req.query.priority;

    res.status(200);
    return res.json({ task: tasks[ind]});
});

app.put('/tasks/:id', (req, res) => {
    console.log('asasa')
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
})


app.delete('/tasks/:id', (req,res) => {
    const ind = getIndex(req.params.id);
    if (ind === -1) {
        res.status(401);
        return res.json({err: 'Requested Id Not Found!'})
    }

    tasks.splice(ind, 1);
    res.status(200);
    return res.json({ tasks: tasks });
})

function getIndex (reqId) {
    const ind = tasks.findIndex(task => task['id'] === parseInt(reqId));
    return ind;
}

app.listen(PORT, () => {
    console.log('Server is listening on ', PORT);
})

