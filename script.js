// input data
const jorney_duration = '8 weeks';
const intensive_phase_duration = '6 weeks';
const rest_phase_duration = '2 weeks';

const gym_frequency = 3; // 3 times a week
const protein_target = 100; // 100g per day
const intensive_calories = 1750; // 1750 kcal per day during intensive phase
const rest_calories = 2200; // 2200 kcal per day during rest phase

// dynamic file title with days count
let day_count = 0;
document.title = `Diary day ${day_count}`;

// dynamic dialog name
const my_name = 'Liubava';
const dialog_title = document.getElementById('dialog_title');
dialog_title.textContent = `How was your day today, ${my_name}?`;

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

// taking photo with canvas below
// const width = 320;
// let height = 0;

// let streaming = false;

// let video = null;
// let canvas = null;
// let take_photo_btn = null;

// function startup() {
//   video = document.getElementById('video');
//   canvas = document.getElementById('canvas');
//   take_photo_btn = document.getElementById('take_photo_btn');

//   navigator.mediaDevices
//     .getUserMedia({ video: true, audio: false })
//     .then((stream) => {
//       video.srcObject = stream;
//       video.play();
//     })
//     .catch((err) => {
//       console.error(`An error occurred: ${err}`);
//     });

//   video.addEventListener(
//     'canplay',
//     (ev) => {
//       if (!streaming) {
//         height = video.videoHeight / (video.videoWidth / width);

//         if (isNaN(height)) {
//           height = width / (4 / 3);
//         }

//         video.setAttribute('width', width);
//         video.setAttribute('height', height);
//         canvas.setAttribute('width', width);
//         canvas.setAttribute('height', height);
//         streaming = true;
//       }
//     },
//     false
//   );

//   take_photo_btn.addEventListener('click', (ev) => {
//     ev.preventDefault();
//     takePicture();
//   });

//   clearPhoto();
// }

// function clearPhoto() {
//   const context = canvas.getContext('2d');
//   context.fillStyle = '#AAA';
//   context.fillRect(0, 0, canvas.width, canvas.height);

//   const data = canvas.toDataURL('image/png');
// }

// function closePhoto() {
//   document.getElementById('camera').style.display = 'none';
//   video.pause();

//   const stream = video.srcObject;
//   if (stream) {
//     const tracks = stream.getTracks();
//     tracks.forEach((track) => track.stop());
//   }

//   video.srcObject = null;
// }

// function takePicture() {
//   const context = canvas.getContext('2d');
//   if (width && height) {
//     canvas.width = width;
//     canvas.height = height;
//     context.drawImage(video, 0, 0, width, height);

//     const data = canvas.toDataURL('image/png');
//   } else {
//     clearPhoto();
//   }
// }

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
  records.push(record);
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
    day_count = index + 1;
    const li = document.createElement('li');
    li.innerHTML = `
      <h3>Day ${index + 1}</h3>
      <p><strong>Calories:</strong> ${record.calories}</p>
      <p><strong>Diet Failures:</strong> ${record.dietFailure}</p>
      <p><strong>Gym Day:</strong> ${record.gymDay}</p>
      <p><strong>Workout Completed:</strong> ${record.workoutCompleted}</p>
      <p><strong>Description:</strong> ${record.description}</p>
      ${
        record.photo
          ? `<img src="${record.photo}" alt="Day ${
              index + 1
            } photo" style="max-width: 200px;"/>`
          : ''
      }
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

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoData = e.target.result;
      const record = {
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
      //   clearPhoto();
    };
    reader.readAsDataURL(file);
  } else {
    const record = {
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
    // clearPhoto();
  }
});

window.addEventListener('load', () => {
  displayRecords();
});
