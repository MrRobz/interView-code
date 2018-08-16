import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        transitionToCode() {
            let val = Math.floor(Math2.random() * 100000);
            this.transitionToRoute('code', val);
        }
    }
});
