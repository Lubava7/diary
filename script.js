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

logout_btn.addEventListener('click', handleLogout);

window.addEventListener('load', checkLoginStatus);

// start challenge button - to start count down
const start_challenge_dialog = document.getElementById('start_challenge_modal');
const start_challenge_btn = document.getElementById('start_challenge_btn');
const confirm_challenge_btn = document.getElementById('confirm_challenge_btn');
const close_challenge_btn = document.getElementById('close_challenge_btn');
const info_article = document.getElementById('info_article');

const reset_LS = document.getElementById('reset_LS');

reset_LS.addEventListener('click', () => {
  localStorage.removeItem('challengeStartDate');
  window.location.reload();
});

info_article.style.display = 'none';

let dayCount;
const startDateStr = localStorage.getItem('challengeStartDate');
if (!startDateStr) {
  document.title = 'Начни свой путь!';
}

const updateDayCount = () => {
  const startDateStr = localStorage.getItem('challengeStartDate');

  if (startDateStr) {
    const startDate = new Date(startDateStr);
    const currentDate = new Date();

    startDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const dayCount =
      Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    document.title = `День ${dayCount}`;

    const dayCountElement = document.getElementById('day_count');
    if (dayCountElement) {
      dayCountElement.textContent = `День ${dayCount}`;
    }

    info_article.style.display = 'block';
  } else {
    document.title = 'Начни свой путь!';
    info_article.style.display = 'none';
  }
};

const startCountdown = () => {
  const startDateStr = localStorage.getItem('challengeStartDate');
  if (!startDateStr) return;

  if (startDateStr) {
    start_challenge_btn.style.display = 'none';
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 56); // 8 weeks * 7 days = 56 days

  const countdownElement = document.getElementById('countdown');

  const updateCountdown = () => {
    const now = new Date();
    const timeLeft = endDate - now;

    if (timeLeft <= 0) {
      countdownElement.textContent = 'Курс завершен!';
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.textContent = `${weeks} недель ${remainingDays} дней ${hours} часов ${minutes} минут ${seconds} секунд`;
  };

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();

  window.addEventListener('unload', () => clearInterval(interval));
};

start_challenge_btn.addEventListener('click', () => {
  start_challenge_dialog.showModal();
});

close_challenge_btn.addEventListener('click', () => {
  start_challenge_dialog.close();
});

confirm_challenge_btn.addEventListener('click', () => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  localStorage.setItem('challengeStartDate', startDate.toISOString());

  info_article.style.display = 'block';
  start_challenge_btn.style.display = 'none';

  updateDayCount();
  startCountdown();
  start_challenge_dialog.close();
});

window.addEventListener('load', () => {
  updateDayCount();
  startCountdown();
});

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
});

confirm_btn.addEventListener('click', (e) => {
  dialog.close();
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

// confirm new record
// confirm_btn.addEventListener('click', (e) => {
//   const kcalAmount = document.getElementById('kcal_amount');
//   const description = document.getElementById('description');

//   if (!kcalAmount.value || !description.value) {
//     alert('Please fill in all required fields.');
//     return;
//   }

//   const calories = kcalAmount.value;

//   const dietFailureInput = document.querySelector(
//     'input[name="diet_failure"]:checked'
//   );
//   const gymDayInput = document.querySelector('input[name="gym_day"]:checked');
//   const workoutCompletedInput = document.querySelector(
//     'input[name="workout_check"]:checked'
//   );

//   const dietFailure = dietFailureInput
//     ? document
//         .querySelector(`label[for="${dietFailureInput.id}"]`)
//         .textContent.trim()
//     : '';
//   const gymDay = gymDayInput
//     ? document
//         .querySelector(`label[for="${gymDayInput.id}"]`)
//         .textContent.trim()
//     : '';
//   const workoutCompleted = workoutCompletedInput
//     ? document
//         .querySelector(`label[for="${workoutCompletedInput.id}"]`)
//         .textContent.trim()
//     : '';

//   const file = cameraInput.files[0];
//   let photoData = '';
//   const currentDate = new Date().toLocaleDateString();

//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       photoData = e.target.result;
//       const record = {
//         date: currentDate,
//         calories,
//         dietFailure,
//         gymDay,
//         workoutCompleted,
//         description: description.value,
//         photo: photoData,
//       };

//       saveRecord(record);
//       displayRecords();

//       dialog.close();
//       document.querySelector('form').reset();
//     };
//     reader.readAsDataURL(file);
//   } else {
//     const record = {
//       date: currentDate,
//       calories,
//       dietFailure,
//       gymDay,
//       workoutCompleted,
//       description: description.value,
//       photo: '',
//     };

//     saveRecord(record);
//     displayRecords();

//     dialog.close();
//     document.querySelector('form').reset();
//   }
// });

// window.addEventListener('load', () => {
//   displayRecords();
// });

// запрос к записям с бэкенда
async function getData() {
  try {
    const response = await fetch('http://localhost:3000/records');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
}

// добавление записей на бэк
async function addRecord(recordData) {
  try {
    const response = await fetch('http://localhost:3000/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photo: recordData.photo,

        description: recordData.description,
        is_gym_day: recordData.gymDay === 'Да',
        is_failure: recordData.dietFailure === 'Да',
        is_full_workout: recordData.workoutCompleted === 'Да',
        date: new Date().toISOString(),
        calorie_count: parseInt(recordData.calories),
      }),
    });

    console.log('ответ', response);

    if (!response.ok) {
      throw new Error('Failed to add record');
    }

    const result = await response.json();
    console.log('Record added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding record:', error);
    throw error;
  }
}

confirm_btn.addEventListener('click', async (e) => {
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
  const currentDate = new Date().toLocaleDateString();

  try {
    if (file) {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const base64Image = e.target.result;

        const record = {
          date: currentDate,
          calories: kcalAmount.value,
          dietFailure,
          gymDay,
          workoutCompleted,
          description: description.value,
          photo: base64Image,
        };

        try {
          await addRecord(record);
          saveRecord(record);
          displayRecords();
          dialog.close();
          document.querySelector('form').reset();
          preview.src = '';
        } catch (error) {
          alert('Failed to save record. Please try again.');
        }
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

      await addRecord(record);

      saveRecord(record);
      displayRecords();

      dialog.close();
      document.querySelector('form').reset();
    }
  } catch (error) {
    console.error('Error saving record:', error);
    alert('Failed to save record. Please try again.');
  }
});

// display records
const ul = document.getElementById('list');

const displayRecords = async () => {
  // const records = JSON.parse(localStorage.getItem('records') || '[]');
  const records = await getData();

  ul.innerHTML = '';

  if (records.length === 0) {
    ul.innerHTML = '<p>Пока нет ни одной записи</p>';
    return;
  }

  records.forEach((record, index) => {
    const li = document.createElement('li');

    const photoSrc = record.photo?.data
      ? `data:image/jpeg;base64,${Buffer.from(record.photo.data).toString(
          'base64'
        )}`
      : record.photo;

    li.innerHTML = `
    ${
      photoSrc
        ? `<img src="${photoSrc}" alt="День ${records.length - index} photo"/>`
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

window.addEventListener('load', () => {
  displayRecords();
});
