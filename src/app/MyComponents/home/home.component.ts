import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  @Output() send_id = new EventEmitter;
  ngOnInit(): void {
    this.getTrendingAnime();

  }
  allAnime: any;
  mal_id: number = 0;
  trendingAnime: any;
  private url: string = `https://api.jikan.moe/v4/anime?q=`;
  private malUrl: string = `https://myanimelist.net/anime/`;
  searchTerm: string = "";
  searchAnime(e: Event){
    e.preventDefault();
    fetch(`${this.url}${this.searchTerm}`).then((Response) => {
            Response.json().then((Result) => {
              this.allAnime = Result.data;
              // if(this.searchTerm!=='')
              {
                console.log(this.allAnime);
              }
            });
          });

  }

  getTrendingAnime(){
    fetch(`${this.url}`).then((Response) => {
      Response.json().then((Result) => {
        this.trendingAnime = Result.data;


          console.log(this.trendingAnime);
        
      });
    });
  }
  
  redirect(id:number){
    this.mal_id = id;
    window.open(`${this.malUrl}${id}`,"_blank");
    this.send_id.emit(this.mal_id);

  }
}

