type Language = 'pl' | 'en';

type Translations = {
  [lang in Language]: {
    [key: string]: string;
  };
};

class Translator {
  private static instance: Translator;
  private language: Language = 'en';
  private languageSet = false;

  private translations: Translations = {
    pl: {
      'Package Manager': 'Menedżer Pakietów',
      'Search package...': 'Wyszukaj paczkę...',
      'Install Packages': 'Zainstaluj Pakiety',
      'Refresh Packages': 'Odśwież Pakiety',
      'Back': 'Wstecz',
      'Go Back': "Wróć",
      'Loading...': 'Wczytywanie...',
      'Sorry, no packages found or notebook is closed.': 'Nie znaleziono żadnych pakietów lub notatnik nie został otwarty.',
      'Name': 'Nazwa',
      'Version': 'Wersja',
      'Click "Ok" to confirm the deletion of': 'Kliknij "OK", aby potwierdzić usunięcie',
      'Delete':'Usuń',
      'Uninstall': 'Odinstaluj',
      'Error during uninstalling': 'Błąd podczas instalacji',
      'No kernel available.': 'Brak dostępnego rdzenia obliczeniowego.',
      'Package is already installed.': 'Pakiet jest już zainstalowany.',
      'An error occurred while checking installation. Check the correctness of the package name.': 'Nie udało się zweryfikować instalacji pakietu. Sprawdź, czy nazwa pakietu jest poprawna.',
      'Error installing the package.': 'Błąd podczas instalacji pakietu.',
      'Package installed successfully.': 'Pomyślnie zainstalowano pakiet.',
      'An error occurred during installation. Check the correctness of the package name.': 'Wystąpił błąd podczas instalacji. Sprawdź, czy nazwa pakietu jest poprawna.',
      'Usage': 'Użycie',
      'Enter': 'Wpisz',
      'package_name': 'nazwa_pakietu',
      'or': 'lub',
      'package_name==version': 'nazwa_pakietu==wersja',
      'Enter package name...': 'Wpisz nazwę pakietu...',
      'Processing...': 'Przetwarzanie...',
      'Install': 'Zainstaluj',
    },
    en: {}
  };

  private constructor() {}

  public static getInstance(): Translator {
    if (!Translator.instance) {
      Translator.instance = new Translator();
    }
    return Translator.instance;
  }

  public setLanguage(lang: Language) {
    if (this.languageSet) {
      throw new Error('Language can only be set once!');
    }
    this.language = lang;
    this.languageSet = true;
  }

  public translate(text: string): string {
    if (this.language === 'en') return text;
    const langTranslations = this.translations[this.language];
    return langTranslations[text] || text;
  }
}

export const translator = Translator.getInstance();
export const t = (text: string) => translator.translate(text);
