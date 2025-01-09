// login data
const userCredentials = {
  name: 'Любава',
  password: '2222',
};

const loginContainer = document.getElementById('login_container');
const appContainer = document.getElementById('app_container');
const loginForm = document.getElementById('login_form');
const loginBtn = document.getElementById('login_btn');
const errorMsg = document.getElementById('error_msg');

const logout_btn = document.getElementById('logout_btn');

const checkLoginStatus = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    showApp();
  } else {
    showLogin();
  }
};

const showLogin = () => {
  loginContainer.style.display = 'block';
  appContainer.style.display = 'none';
};

const showApp = () => {
  loginContainer.style.display = 'none';
  appContainer.style.display = 'block';
  addLogoutButton();
};

const addLogoutButton = () => {
  if (!logout_btn) {
    logout_btn.addEventListener('click', handleLogout);
  }
};

loginBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();

  if (name === userCredentials.name && password === userCredentials.password) {
    localStorage.setItem('isLoggedIn', 'true');

    showApp();
  } else {
    errorMsg.style.display = 'block';
  }
});

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn');

  showLogin();
};

window.addEventListener('load', checkLoginStatus);

// start challenge button - to start count down
const start_challenge_btn = document.getElementById('start_challenge_btn');

start_challenge_btn.addEventListener('click', () => {
  const startDate = new Date().toLocaleDateString();
  localStorage.setItem('challengeStartDate', startDate);

  updateDayCount();
});

let dayCount;
document.title = `День ${dayCount}`;

const updateDayCount = () => {
  const startDateStr = localStorage.getItem('challengeStartDate');
  if (startDateStr) {
    const startDate = new Date(startDateStr);
    const currentDate = new Date();

    dayCount = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

    document.title = `День ${dayCount}`;
    const dayCountElement = document.getElementById('day_count');
    if (dayCountElement) {
      dayCountElement.textContent = `Day ${dayCount}`;
    }
  }
};
window.addEventListener('load', updateDayCount);

// input data
const jorney_duration = '8 weeks';
const intensive_phase_duration = '6 weeks';
const rest_phase_duration = '2 weeks';

const gym_frequency = 3; // 3 times a week
const protein_target = 100; // 100g per day
const intensive_calories = 1750; // 1750 kcal per day during intensive phase
const rest_calories = 2200; // 2200 kcal per day during rest phase

// dynamic dialog name
const my_name = userCredentials.name;
const dialog_title = document.getElementById('dialog_title');
dialog_title.textContent = `Как прошел сегодняшний день, ${my_name}?`;

// modal window
const add_record_btn = document.getElementById('add_record');
const dialog = document.getElementById('modal');
const close_btn = document.getElementById('close_btn');
const confirm_btn = document.getElementById('confirm_btn');

add_record_btn.addEventListener('click', (e) => {
  dialog.showModal();
});

close_btn.addEventListener('click', (e) => {
  dialog.close();
  document.getElementById('camera').style.display = 'none';
});

confirm_btn.addEventListener('click', (e) => {
  dialog.close();
});

document.getElementById('camera').style.display = 'none';

const add_photo_btn = document.getElementById('add_photo_btn');
add_photo_btn.addEventListener('click', (e) => {
  document.getElementById('camera').style.display = 'block';
  startup();
});

const close_photo_btn = document.getElementById('close_photo_btn');
close_photo_btn.addEventListener('click', (e) => {
  document.getElementById('camera').style.display = 'none';
});

const cameraInput = document.getElementById('cameraInput');
const preview = document.getElementById('preview');

cameraInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

cameraInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// save form data
const saveRecord = (record) => {
  const records = JSON.parse(localStorage.getItem('records') || '[]');
  records.unshift(record);
  localStorage.setItem('records', JSON.stringify(records));
};

// display records
const ul = document.getElementById('list');

const displayRecords = () => {
  const records = JSON.parse(localStorage.getItem('records') || '[]');
  ul.innerHTML = '';

  if (records.length === 0) {
    ul.innerHTML = '<p>Пока нет ни одной записи</p>';
    return;
  }

  records.forEach((record, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
    ${
      record.photo
        ? `<img src="${record.photo}" alt="День ${
            records.length - index
          } photo"/>`
        : ''
    }
   <div class="card_content">
    <h2>День ${records.length - index}</h2>
    <p>
    <strong>Дата:</strong> ${record.date} </br>
    <strong>Калории:</strong> ${record.calories} </br>
     <strong>Срывы:</strong> ${record.dietFailure}  </br>
     <strong>Была в зале:</strong> ${record.gymDay}  </br>
     <strong>Весь воркаут завершен:</strong> ${record.workoutCompleted}  </br>
     <strong>Описание:</strong> ${record.description}  </br>
     </p>
   </div>
    `;
    ul.appendChild(li);
  });
};

// confirm new record
confirm_btn.addEventListener('click', (e) => {
  const kcalAmount = document.getElementById('kcal_amount');
  const description = document.getElementById('description');

  if (!kcalAmount.value || !description.value) {
    alert('Please fill in all required fields.');
    return;
  }

  const calories = kcalAmount.value;

  const dietFailureInput = document.querySelector(
    'input[name="diet_failure"]:checked'
  );
  const gymDayInput = document.querySelector('input[name="gym_day"]:checked');
  const workoutCompletedInput = document.querySelector(
    'input[name="workout_check"]:checked'
  );

  const dietFailure = dietFailureInput
    ? document
        .querySelector(`label[for="${dietFailureInput.id}"]`)
        .textContent.trim()
    : '';
  const gymDay = gymDayInput
    ? document
        .querySelector(`label[for="${gymDayInput.id}"]`)
        .textContent.trim()
    : '';
  const workoutCompleted = workoutCompletedInput
    ? document
        .querySelector(`label[for="${workoutCompletedInput.id}"]`)
        .textContent.trim()
    : '';

  const file = cameraInput.files[0];
  let photoData = '';
  const currentDate = new Date().toLocaleDateString();

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoData = e.target.result;
      const record = {
        date: currentDate,
        calories,
        dietFailure,
        gymDay,
        workoutCompleted,
        description: description.value,
        photo: photoData,
      };

      saveRecord(record);
      displayRecords();

      dialog.close();
      document.querySelector('form').reset();
      document.getElementById('camera').style.display = 'none';
    };
    reader.readAsDataURL(file);
  } else {
    const record = {
      date: currentDate,
      calories,
      dietFailure,
      gymDay,
      workoutCompleted,
      description: description.value,
      photo: '',
    };

    saveRecord(record);
    displayRecords();

    dialog.close();
    document.querySelector('form').reset();
    document.getElementById('camera').style.display = 'none';
  }
});

window.addEventListener('load', () => {
  displayRecords();
});
