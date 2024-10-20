from pathlib import Path

# Ścieżki w projekcie
BASE_DIR = Path(__file__).resolve().parent.parent

# Klucz bezpieczeństwa (zmień na własny w produkcji)
SECRET_KEY = 'your-secret-key'  # <--- Zamień na własny klucz

# Tryb debugowania
DEBUG = True

# Dozwolone hosty
ALLOWED_HOSTS = []

# Aplikacje zainstalowane
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',                  # Aplikacja blog
    'users',                 # Aplikacja użytkowników
    'crispy_forms',          # Biblioteka do lepszego renderowania formularzy
    'crispy_bootstrap5',     # Dodaj ten wiersz, jeśli używasz Bootstrap 5
]

# Konfiguracja crispy forms
CRISPY_TEMPLATE_PACK = 'bootstrap5'  # Zmień na 'bootstrap4' jeśli używasz Bootstrap 4

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Konfiguracja URL
ROOT_URLCONF = 'myblog.urls'

# Konfiguracja szablonów
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Katalog z szablonami
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',  # Wymagane przez Django auth
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Aplikacja WSGI
WSGI_APPLICATION = 'myblog.wsgi.application'

# Konfiguracja bazy danych (SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Walidacja haseł
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        # Opcjonalnie, ustaw minimalną długość
        # 'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Ustawienia międzynarodowe
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Pliki statyczne
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / 'static',  # Opcjonalnie, jeśli masz globalne pliki statyczne
]

# Domyślny klucz podstawowy
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Przekierowania po logowaniu/wylogowaniu
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = 'home'
