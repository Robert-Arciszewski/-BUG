from flask import Flask, request, jsonify, render_template
import sqlite3
import os
import logging

app = Flask(__name__)
DATABASE = 'todo.db'

# Konfiguracja logowania
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def init_db():
    if not os.path.exists(DATABASE):
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''CREATE TABLE IF NOT EXISTS tasks
                              (id INTEGER PRIMARY KEY AUTOINCREMENT,
                               title TEXT NOT NULL,
                               description TEXT,
                               done INTEGER NOT NULL CHECK (done IN (0,1)))''')
            conn.commit()
            logging.info("Baza danych została utworzona i tabela 'tasks' jest gotowa.")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=['GET'])
def get_tasks():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks")
        tasks = [
            {
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'done': bool(row[3])
            } for row in cursor.fetchall()
        ]
    logging.debug(f"Pobrano zadania: {tasks}")
    return jsonify(tasks), 200

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id=?", (task_id,))
        row = cursor.fetchone()
        if row:
            task = {
                'id': row[0],
                'title': row[1],
                'description': row[2],
                'done': bool(row[3])
            }
            logging.debug(f"Pobrano zadanie: {task}")
            return jsonify(task), 200
        else:
            logging.warning(f"Zadanie o ID {task_id} nie zostało znalezione.")
            return jsonify({'error': 'Task not found'}), 404

@app.route('/tasks', methods=['POST'])
def create_task():
    if not request.json or 'title' not in request.json:
        logging.warning("Próba utworzenia zadania bez tytułu.")
        return jsonify({'error': 'Title is required'}), 400

    new_task = {
        'title': request.json['title'],
        'description': request.json.get('description', ''),
        'done': False
    }

    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO tasks (title, description, done) VALUES (?, ?, ?)",
            (new_task['title'], new_task['description'], int(new_task['done']))
        )
        new_task['id'] = cursor.lastrowid
        conn.commit()
        logging.info(f"Utworzono nowe zadanie: {new_task}")

    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    if not request.json:
        logging.warning("Próba aktualizacji zadania bez danych JSON.")
        return jsonify({'error': 'Request body must be JSON'}), 400

    updates = {}
    if 'title' in request.json:
        updates['title'] = request.json['title']
    if 'description' in request.json:
        updates['description'] = request.json['description']
    if 'done' in request.json:
        # Upewnij się, że 'done' jest booleanem
        if isinstance(request.json['done'], bool):
            updates['done'] = int(request.json['done'])
        else:
            logging.warning(f"Nieprawidłowy typ dla 'done': {request.json['done']}")
            return jsonify({'error': "'done' must be a boolean"}), 400

    if not updates:
        logging.warning("Próba aktualizacji zadania bez prawidłowych pól.")
        return jsonify({'error': 'No valid fields to update'}), 400

    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        fields = ', '.join(f"{k}=?" for k in updates.keys())
        values = list(updates.values())
        values.append(task_id)
        cursor.execute(f"UPDATE tasks SET {fields} WHERE id=?", values)
        conn.commit()

        if cursor.rowcount == 0:
            logging.warning(f"Zadanie o ID {task_id} nie zostało znalezione podczas aktualizacji.")
            return jsonify({'error': 'Task not found'}), 404

        logging.info(f"Zaktualizowano zadanie o ID {task_id}: {updates}")

    return jsonify({'message': 'Task updated successfully'}), 200

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tasks WHERE id=?", (task_id,))
        conn.commit()

        if cursor.rowcount == 0:
            logging.warning(f"Zadanie o ID {task_id} nie zostało znalezione podczas usuwania.")
            return jsonify({'error': 'Task not found'}), 404

        logging.info(f"Usunięto zadanie o ID {task_id}.")

    return jsonify({'message': 'Task deleted successfully'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
