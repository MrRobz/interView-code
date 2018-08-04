import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        transitionToCode() {
            let val = Math.floor(100000 + Math.random() * 9000);
            this.transitionToRoute('code', val);
        }
    }
});
