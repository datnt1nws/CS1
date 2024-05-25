class Student {
    constructor(id, name, dob, gender, className, photo) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.className = className;
        this.photo = photo;
    }
}

class StudentManager {
    constructor() {
        this.students = [
            new Student('1', 'Nguyễn Văn A', '2000-01-01', 'Nam', '10A1', 'https://via.placeholder.com/75'),
            new Student('2', 'Trần Thị B', '2001-02-02', 'Nữ', '11B2', 'https://via.placeholder.com/75'),
            new Student('3', 'Lê Văn C', '2002-03-03', 'Nam', '12C3', 'https://via.placeholder.com/75')
        ];
        this.editIndex = null;
        this.renderStudents();
    }

    addStudent() {
        const id = document.getElementById('studentId').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const dob = document.getElementById('studentDob').value;
        const gender = document.getElementById('studentGender').value;
        const className = document.getElementById('studentClass').value.trim();
        const photo = document.getElementById('studentPhoto').value.trim();

        if (!id || !name || !dob || !gender || !className || !photo) {
            alert('Vui lòng điền đầy đủ thông tin học viên');
            return;
        }

        const newStudent = new Student(id, name, dob, gender, className, photo);
        console.log('Adding new student:', newStudent);
        this.students.push(newStudent);

        this.clearForm();
        this.renderStudents();
    }

    saveStudent() {
        if (this.editIndex === null) {
            alert('Không có học viên nào đang được chỉnh sửa');
            return;
        }

        const id = document.getElementById('studentId').value.trim();
        const name = document.getElementById('studentName').value.trim();
        const dob = document.getElementById('studentDob').value;
        const gender = document.getElementById('studentGender').value;
        const className = document.getElementById('studentClass').value.trim();
        const photo = document.getElementById('studentPhoto').value.trim();

        if (!id || !name || !dob || !gender || !className || !photo) {
            alert('Vui lòng điền đầy đủ thông tin học viên');
            return;
        }

        const updatedStudent = new Student(id, name, dob, gender, className, photo);
        console.log('Updating student at index', this.editIndex, 'with:', updatedStudent);
        this.students[this.editIndex] = updatedStudent;
        this.editIndex = null;

        this.clearForm();
        this.renderStudents();
    }

    deleteStudent(index) {
        console.log('Deleting student at index', index);
        this.students.splice(index, 1);
        this.renderStudents();
    }

    editStudent(index) {
        console.log('Editing student at index', index + 1);
        const student = this.students[index];
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentDob').value = student.dob;
        document.getElementById('studentGender').value = student.gender;
        document.getElementById('studentClass').value = student.className;
        document.getElementById('studentPhoto').value = student.photo;
        this.editIndex = index;
    }

    clearForm() {
        document.getElementById('studentId').value = '';
        document.getElementById('studentName').value = '';
        document.getElementById('studentDob').value = '';
        document.getElementById('studentGender').value = 'Nam';
        document.getElementById('studentClass').value = '';
        document.getElementById('studentPhoto').value = '';
    }

    renderStudents() {
        const studentTableBody = document.querySelector('#studentTable tbody');
        studentTableBody.innerHTML = '';

        this.students.forEach((student, index) => {
            let row = document.createElement('tr');

            let cellId = document.createElement('td');
            cellId.textContent = student.id;
            row.appendChild(cellId);

            let cellName = document.createElement('td');
            cellName.textContent = student.name;
            row.appendChild(cellName);

            let cellDob = document.createElement('td');
            cellDob.textContent = student.dob;
            row.appendChild(cellDob);

            let cellGender = document.createElement('td');
            cellGender.textContent = student.gender;
            row.appendChild(cellGender);

            let cellClass = document.createElement('td');
            cellClass.textContent = student.className;
            row.appendChild(cellClass);

            let cellPhoto = document.createElement('td');
            let img = document.createElement('img');
            img.src = student.photo;
            img.alt = student.name;
            img.style.width = '75px';
            img.style.height = '75px';
            cellPhoto.appendChild(img);
            row.appendChild(cellPhoto);

            let cellActions = document.createElement('td');
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => this.deleteStudent(index);
            cellActions.appendChild(deleteButton);

            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => this.editStudent(index);
            cellActions.appendChild(editButton);

            row.appendChild(cellActions);

            studentTableBody.appendChild(row);
        });
    }
}

const studentManager = new StudentManager();
