import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { get, set } from '@ember/object';
import FileSaver from 'file-saver';


let { firebase, CodeMirror, Firepad } = window;

let firepadRef, codeMirror, firepad;

export default Controller.extend({

  copyText: 'Copy url',
  language: { name: 'Choose language'},
  languageList: ['c','java','javascript','c++'],

  init() {
    run.schedule('afterRender', this, () => {
      firebase.initializeApp({
          apiKey: 'AIzaSyAw2zRcs7UtPkZb0K8zbepfsQhsRfKLtyU',
          databaseURL: "https://interview-code-3883b.firebaseio.com",
          authDomain: "interview-code-3883b.firebaseapp.com",
          projectId: "interview-code-3883b",
          storageBucket: "",
          messagingSenderId: "989024778703"
      });
  
      // Get Firebase Database reference.
      firepadRef = firebase.database().ref();
      firepadRef = firepadRef.child(get(this, 'model.shared_id'));

      // Create CodeMirror (with lineWrapping on).
      codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineNumbers: true,
        autofocus: true,
      });

      CodeMirror.modeURL = "https://codemirror.net/mode/%N/%N.js"

      var userId = Math.floor(Math.random() * 9999999999).toString();

      // Create Firepad (with rich text toolbar and shortcuts enabled).
      firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        userId: userId,
        defaultText: 'Share the url to start colaborating ...'
      });

      set(this, 'languageList', CodeMirror.modeInfo);
      
      var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
      document.querySelector('.users'), userId);


      firepad.on('ready', function() {
        if (firepad.isHistoryEmpty()) {
          // firepad.setText('Check out the user list to the left!');
        }
      });

    });
  },
  actions: {
    changeLanguageMode(choice) {
      set(this, 'language', choice);
      codeMirror.setOption("mode", choice.mime);
      CodeMirror.autoLoadMode(codeMirror,  choice.mode);
    },

    download() {
      let textContent = codeMirror.getValue();
      window.saveAs(new Blob([textContent], {type: 'text/plain'}), 'interview-code.txt');
    },

    clear() {
      firepad.setText('');
    },

    copyToClipboard() {
      let textarea = document.createElement('textarea');
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      set(this, 'copyText', 'Copied to clipboard');
      run.later((() => {
        set(this, 'copyText', 'Copy url');
      }), 1000);
    }
  }
});
