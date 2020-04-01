import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { News } from './noticia';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  listNews: AngularFirestoreCollection<News>;
  news: Observable<News[]>;

  constructor(private db2: AngularFirestore) {
  }

  getNews(){
    return this.db2.collection<News>('noticias').snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as News;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  getNew(id:string){
    return this.db2.collection<News>('noticias').doc(id).valueChanges();
  }

}
