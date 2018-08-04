export default function(){
  this.transition(
    this.fromRoute('home-page'),
    this.toRoute('code'),
    this.use('fade'),
    this.reverse('fade')
  );
}