const db = require('../../data/dbConfig')

function add(task) {
    console.log(task)
    return db('tasks').insert(task)
        .then((id) => {
            return db('tasks').where('task_id', id).first()
        })
}

async function getTasks() {
    const taskRow = await db('tasks as t')
        .leftJoin('projects as p', 't.project_id', 'p.project_id')
        .select(
            't.task_description',
            't.task_notes',
            't.task_completed',
            // 'p.project_id',
            'p.project_name',
            'p.project_description'
        )
      
    let tasks = []

    for (let i = 0; i < taskRow.length; i++) {
        tasks.push({
            project_name: taskRow[i].project_name,
            project_description: taskRow[i].project_description,
            task_notes: taskRow[i].task_notes,
            task_completed: taskRow[i].task_completed === 1 ? true : false,
            task_description: taskRow[i].task_description
        })
    }
    console.log(tasks)
    return tasks
}


module.exports = { getTasks, add }