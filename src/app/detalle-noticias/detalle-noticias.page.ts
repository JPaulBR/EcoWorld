import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiasService } from '../tablas/noticias/noticias.service';

@Component({
  selector: 'app-detalle-noticias',
  templateUrl: './detalle-noticias.page.html',
  styleUrls: ['./detalle-noticias.page.scss'],
})
export class DetalleNoticiasPage implements OnInit {

  id: string;
  listNew: any;


  constructor(private route:ActivatedRoute,private apt:NoticiasService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apt.getNew(this.id).subscribe(res=>{
      this.listNew = res;
    });
  }

  openLink(link:string){
    window.open(link,'_system');
  }

}
