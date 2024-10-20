document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const tasksList = document.getElementById('tasks');

    // Pobierz i wyświetl listę zadań
    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(data => {
                tasksList.innerHTML = '';
                data.forEach(task => {
                    const li = document.createElement('li');
                    li.className = task.done ? 'done' : '';
                    li.innerHTML = `
                        <div class="task-details">
                            <p class="task-title">${task.title}</p>
                            <p class="task-description">${task.description}</p>
                        </div>
                        <div class="task-actions">
                            <button class="complete" onclick="toggleDone(${task.id}, ${task.done})">
                                ${task.done ? 'Niedokończone' : 'Ukończone'}
                            </button>
                            <button class="delete" onclick="deleteTask(${task.id})">Usuń</button>
                        </div>
                    `;
                    tasksList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Błąd podczas pobierania zadań:', error);
            });
    }

    // Dodaj nowe zadanie
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();

        if (title === '') {
            alert('Tytuł zadania jest wymagany.');
            return;
        }

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw data; });
            }
            return response.json();
        })
        .then(data => {
            taskForm.reset();
            fetchTasks();
        })
        .catch(error => {
            console.error('Błąd podczas tworzenia zadania:', error);
            alert(error.error || 'Wystąpił błąd podczas tworzenia zadania.');
        });
    });

    // Oznacz zadanie jako ukończone/niedokończone
    window.toggleDone = function(id, done) {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done: !done })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw data; });
            }
            return response.json();
        })
        .then(data => {
            fetchTasks();
        })
        .catch(error => {
            console.error('Błąd podczas aktualizacji zadania:', error);
            alert(error.error || 'Wystąpił błąd podczas aktualizacji zadania.');
        });
    };

    // Usuń zadanie
    window.deleteTask = function(id) {
        if (!confirm('Czy na pewno chcesz usunąć to zadanie?')) {
            return;
        }
        fetch(`/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw data; });
            }
            return response.json();
        })
        .then(data => {
            fetchTasks();
        })
        .catch(error => {
            console.error('Błąd podczas usuwania zadania:', error);
            alert(error.error || 'Wystąpił błąd podczas usuwania zadania.');
        });
    };

    // Inicjalne pobranie zadań
    fetchTasks();
});
