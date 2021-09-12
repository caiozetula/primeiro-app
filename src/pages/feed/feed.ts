import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Caio Zetula",
    data: "11 de setembro",
    descricao: "Estou criando meu primeiro app. Yaaaay",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  public somaDoisNumeros(num1:number, num2:number):void{
    alert(num1 + num2);
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando();
    console.log('ionViewDidLoad FeedPage');
    //this.somaDoisNumeros(10, 99);
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data=>{
        const response = (data as any);

        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(response.results);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = response.results;
        }

        console.log(data);
        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error=>{
        console.log(error);
        this.fechaCarregando();
      })
  }
}
