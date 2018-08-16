import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { get, set } from '@ember/object';
import { observer } from '@ember/object';

let { firebase, CodeMirror, Firepad, FirepadUserList } = window;

let firepadRef, codeMirror, firepad, userId;

export default Controller.extend({

  copyText: 'Copy url',
  language: { name: 'Choose language'},
  languageList: ['c','java','javascript','c++'],

  init() {
    this._super(...arguments);
    run.schedule('afterRender', this, () => {
      firebase.initializeApp({
          apiKey: 'AIzaSyAw2zRcs7UtPkZb0K8zbepfsQhsRfKLtyU',
          databaseURL: "https://interview-code-3883b.firebaseio.com",
          authDomain: "interview-code-3883b.firebaseapp.com",
          projectId: "interview-code-3883b",
          storageBucket: "",
          messagingSenderId: "989024778703"
      });
      userId = Math.floor(Math.random() * 9999999999).toString();
    });
  },

  setup: observer('model', function() {
    run.schedule('afterRender', this, () => {
      firepadRef = firebase.database().ref();
      firepadRef = firepadRef.child(get(this, 'model.shared_id'));

      // Create CodeMirror.
      codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineNumbers: true,
        autofocus: true,
      });

      set(this, 'language', { name: 'Choose language'});
      firepadRef.child('language').on('value', (snapshot) => {
        let choice = snapshot.val();
        if (choice) {
          set(this, 'language', choice);
          codeMirror.setOption("mode", choice.mime);
          CodeMirror.autoLoadMode(codeMirror,  choice.mode);
        }
      });

      set(this, 'languageList', CodeMirror.modeInfo);

      CodeMirror.modeURL = "https://codemirror.net/mode/%N/%N.js"

      // Create Firepad (with rich text toolbar and shortcuts enabled).
      firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        userId: userId,
        defaultText: 'Share the url to start colaborating ...'
      });
      FirepadUserList.fromDiv(firepadRef.child('users'), document.querySelector('.users'), userId);
    });
  }),
   
  actions: {
    changeLanguageMode(choice) {
      hello123 = get(this, 'language');
      firepadRef.child('language').set(choice);
    },

    download() {
      let textContent = codeMirror.getValue123();
      window.saveAs(new Blob([textContent], {type: 'text/plain'}), 'interview-code.txt');
    },

    clear() {
      vasdg = asd
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
