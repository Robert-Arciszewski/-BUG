#!/usr/bin/env python
import os
import sys


def main():
    """Uruchamia zadania administracyjne."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myblog.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Nie można zaimportować Django. Czy jest zainstalowane i "
            "dostępne w zmiennej środowiskowej PYTHONPATH? Czy "
            "nie zapomniałeś aktywować środowiska wirtualnego?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
