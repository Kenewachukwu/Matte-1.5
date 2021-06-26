import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

let muteState = 'mute';
const muteIconContainer = document.getElementById('mute-icon');
const audio = document.querySelector("audio");
audio.volume = 0.2;

const muteAnimation = lottieWeb.loadAnimation({
    container: muteIconContainer,
    path: './lottie/mute.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name: "Mute Animation",
});


muteIconContainer.addEventListener('click', () => {
  if(muteState === 'unmute') {
    muteAnimation.playSegments([100, 180], true);
    audio.muted = true;
    muteState = 'mute';
  } else {
    muteAnimation.playSegments([0, 100], true);
    audio.muted = false;
    muteState = 'unmute';
    audio.volume = 0.2;
  }
});
window.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
        document.querySelector(`a[href="#${id.split(/(?=[A-Z])/)[0]}"]`).classList.add('active-nav');
      } else {
        document.querySelector(`a[href="#${id.split(/(?=[A-Z])/)[0]}"]`).classList.remove('active-nav');
      }
    });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });
  
});
document.addEventListener('submit', (event) => {
  // Prevent form from submitting to the server
  event.preventDefault();
  console.log('Config submitted');
  // Do some stuff...
  document.getElementById("sendButton").innerHTML = "Sending";
  document.getElementById("sendButton").classList.add('loading');

  let form = JSON.stringify(Object.fromEntries(new FormData(event.target)));
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(JSON.parse(form).email)){
    fetch('https://matte.ng/mailing/mail.php', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(form)
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById("sendButton").innerHTML = "send";
            document.getElementById("sendButton").classList.remove('loading');
            document.getElementById("myForm").reset();
            alert('message sent successfully')
        })
        .catch((error) => {
          document.getElementById("sendButton").innerHTML = "send";
          document.getElementById("sendButton").classList.remove('loading');
            console.error('Error:', error);
            alert("An error occured "+error.message);
        });
    }
  else {
    document.getElementById("sendButton").innerHTML = "send";
  document.getElementById("sendButton").classList.remove('loading');
      alert("You have entered an invalid email address!");
  }

  /* if (status) {
      window.alert('saved successfully');
      document.getElementById('close').click();
  } else {
      window.alert('An Error Occured');
  } */
});