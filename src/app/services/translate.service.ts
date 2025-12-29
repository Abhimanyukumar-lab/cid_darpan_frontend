import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  control: any;
  defaultLang: string;

  constructor(private appStore: Store<{ app: any }>, private router: Router) {
    google.load('elements', '1', {
      packages: 'transliteration',
      nocss: true,
    });

    google.setOnLoadCallback(this.onLoad());
    this.appStore.pipe(select('app')).subscribe((data) => {
      this.defaultLang = data.defaultLang;
      if (data.defaultLang == 'en') {
        this.onLoad();
      } else {
        this.onLoad();
      }
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.defaultLang == 'en') {
          this.onLoad();
        } else {
          this.onLoad();
        }
      }
    });
  }

  onLoad = () => {
    this.control = null;

    var options = {
      sourceLanguage: google.elements.transliteration.LanguageCode.ENGLISH,
      destinationLanguage: [google.elements.transliteration.LanguageCode.HINDI],
      shortcutKey: 'ctrl+g',
      transliterationEnabled: true,
    };
    this.control = new google.elements.transliteration.TransliterationControl(
      options
    );
    var elements = document.getElementsByClassName('hindiFont');
    this.control.makeTransliteratable(elements);

    if (this.defaultLang == 'hi') this.control.enableTransliteration();
    else this.control.disableTransliteration();
  };

  onLoadAddedControll = (htmlElement: HTMLCollectionOf<Element>) => {
    if (this.defaultLang != 'en') {
      this.control.makeTransliteratable(htmlElement);
      this.control.enableTransliteration();
    }
  };

  disableTranslation = () => {
    if (this.control) this.control.disableTransliteration();
    this.control = null;
  };

  makeTranslate = (target: HTMLInputElement) => {
    // google.language.transliterate(
    //   [target.value],
    //   'en',
    //   'hi',
    //   function (result) {
    //     if (!result.error) {
    //       if (
    //         result.transliterations &&
    //         result.transliterations.length > 0 &&
    //         result.transliterations[0].transliteratedWords.length > 0
    //       ) {
    //         target.innerHTML =
    //           result.transliterations[0].transliteratedWords[0];
    //       }
    //     }
    //   }
    // );

    //Load the Language API.
    google.load('language', '1');
    google.language.transliterate(['Namaste'], 'en', 'hi', function (result) {
      if (!result.error) {
        var container = document.getElementById('transliteration');
        if (
          result.transliterations &&
          result.transliterations.length > 0 &&
          result.transliterations[0].transliteratedWords.length > 0
        ) {
          container.innerHTML =
            result.transliterations[0].transliteratedWords[0];
        }
      }
    });
  };
}
