import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http:HttpClient) {

   }


  private baseUrl = 'http://localhost:8080/api/reclamation/';  

  createReclamation(reclamation: any, from:number,to:number): Observable<object> {
    return this.http.post(`${this.baseUrl}${from}/to/${to}`, reclamation);
  }

  getAllReclamation(page: number, size: number, exactly:String): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    return this.http.get(`${this.baseUrl}reclamations/${exactly}`, { params });
  }

  deleteReclamation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text' });
  }

  updateReclamation(details: any): Observable<Object> {
    console.log("details====", details)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`${this.baseUrl}`, details,httpOptions);
  }



  //chatbot training


  conversation = new Subject<Message[]>();
  messageMap : { [key: string]: string } = {
    "signaler signal alerte alerter Signaler Signal Alerte Alerter signaled":"Vous pouvez signaler n'importe quel utilisateur, vous le faire, vous pouvez cliquer sur le bouton 'Reclamation' présent sur la page de son profil, puis choisir 'Signaler.",
    "signaling alerting alert report reporting Signaling Alerting Alert Report Reporting signalé signalée signalés signaléés":"You can report any user, if you want, you can click on the 'Reclamation' button present on the page of his profile, then choose ''Signal'.",
    "bloquer blocage bloque Bloquer Blocage Bloque bloqué bloquée bloqués bloquées":"Vous pouvez bloquer cet utilisateur, vous le faire, vous pouvez cliquer sur le bouton 'Reclamation' présent sur la page de son profil, puis choisir 'Bloquer', et ce bloquer est définitive jusqu'à vous le débloqueras",
    "block blocking blocking blocking blocking blocking blocked":"You can block this user, if you want, you can click on the 'Reclamation' button present on his profile page, then choose 'Block', and this block is final until you unblock him.",
    "Bannir bannir banné Banné bannie bannis":"Si vous pensez qu'un utilisateur doit être banni, vous pouvez le signaler, et après 5 signals d'utilisateurs différents, notre site va le bannir automatiquement.",
    "ban Ban Banning banning banned Banned":"If you think a user should be banned, you can report him, and after 5 different user alerts, our site will automatically ban them.",
    "avis opinion évaluer évaluation Avis Opinion Évaluer Évaluation":"Vous pouvez évaluer n'importe quel utilisateur, vous le faire, vous pouvez cliquer sur le bouton 'Reclamation' présent sur la page de son profil, puis choisir 'Avis.",
    "opinion Opition evaluating evaluation evaluate rate rating":"You can rate any user, you can click on the 'Reclamation' button present on their profile page and then choose 'Avis.",
    "politiques":"Notre site vous donne la liberté de bloquer n'importe quel utilisateur, de le signaler, faire un feedback et aussi l'évaluer.",
    "policy policies":"Our site gives you the freedom to block any user, report them, give feedback and also rate them.",
    "hello hello! ": "Hello! How can i help you",
    "hey hey! hey?": "Hey! How can i help you",
    "hi hi! hi!! hi!!! hi!!!!": "Hi! How can i help you",
    "morning morning!": "Hello sir, How can i help you?",
    "bonsoir Bonsoir bonsoir! Bonsoir!":"Bonsoir, comment je peux vous aidez ?",
    "who ?": "My name is Forum Bot, how can i help you ?",
    "role role?": "I'm just a guide for our application to help you.",
    "thanks thank thanks! thank!":"You are welcome, feel free to ask!",
    "defaultmsg": "I can't understand your text. Can you please repeat"
  }
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }


  getBotMessage(question: string) {
    let answer = null;
  
    // Parcourir les clés de l'objet
    for (const key of Object.keys(this.messageMap)) {
      const mots1 = key.split(" ");
      const mots2 = question.split(" ");
      let sousChaineCommune = "";
      
      // Parcourir les mots de la première chaîne
      for (let mot1 of mots1) {
        // Parcourir les mots de la deuxième chaîne
        for (let mot2 of mots2) {
          // Vérifier si les mots sont égaux
          if (mot1.toLocaleLowerCase() === mot2.toLocaleLowerCase()) {
            sousChaineCommune = mot1;
            answer = this.messageMap[key];
            break;
          }
        }
        // Si une sous-chaîne commune est trouvée, sortir de la boucle externe
        if (sousChaineCommune !== "") {
          break;
        }
      }
  
      // Vérifier si une sous-chaîne commune a été trouvée
      if (sousChaineCommune !== "") {
        break;
      }
    }
  
    return answer || this.messageMap['defaultmsg'];
  }

  
}
