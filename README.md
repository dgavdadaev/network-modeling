# Network Modeling — лабораторные работы

Учебный репозиторий **Авдадаева Джамала Геланиевича** с практическими заданиями по моделированию и администрированию компьютерных сетей.

Материалы включают исходный код, конфигурации сетей, результаты измерений, отчёты и презентации. Основная рабочая ветка — [`develop`](https://github.com/dgavdadaev/network-modeling/tree/develop).

## Лабораторные работы

| Работа | Материалы | Содержание |
|---|---|---|
| № 2 | [Каталог `lab02`](labs/lab02/) | Практические материалы, отчёт и презентация |
| **№ 3** | **[Каталог `lab03`](labs/lab03/)** | **Измерение и тестирование пропускной способности сети. Воспроизводимый эксперимент** |

### Лабораторная работа № 3

В ЛР-3 с помощью Python API **Mininet** построена топология `h1 — s3 — h2`. Проверены адресация и связность, смоделированы ограничения каналов через **TCLink / HTB / netem**, выполнены ICMP-тесты и автоматизированные измерения **iPerf3**.

Для запуска iPerf3 используются два канала с заданными параметрами `bw=100` Мбит/с, `delay=75ms`, `loss=0`. Результат сохраняется в JSON; из него создаются графики, а полный эксперимент запускается через **GNU Make**.

- [Исходники, Makefile и результаты измерений](labs/lab03/project/)
- [Отчёт — Markdown](labs/lab03/report/Лабораторная_3_Авдадаев.md)
- [Отчёт — PDF](labs/lab03/report/Лабораторная_3_Авдадаев.pdf)
- [Отчёт — DOCX](labs/lab03/report/Лабораторная_3_Авдадаев.docx)
- [Презентация — Markdown](labs/lab03/presentation/Lab03_Presentation_Source.md)
- [Презентация — PDF](labs/lab03/presentation/Lab03_Presentation_Cambria_Calibri.pdf)
- [Презентация — PowerPoint](labs/lab03/presentation/Lab03_Presentation_Cambria_Calibri.pptx)
- [Инструкция по сборке презентации](labs/lab03/presentation/README.md)

**Зафиксированные наблюдения:** при 20 ICMP-запросах в сети без ограничений потери составили 0%, в ограниченной — 15%. В двух автоматических TCP-прогонах измерена скорость около **9,97** и **35,62 Мбит/с**. Это подтверждает повторный запуск процедуры, но не доказывает стабильность измеренного численного результата.

## Структура репозитория

```text
network-modeling/
├── labs/
│   ├── lab02/
│   └── lab03/
│       ├── project/        # Mininet, iPerf3, Makefile, JSON и графики
│       ├── report/         # Markdown, DOCX, PDF, изображения
│       └── presentation/   # Markdown, PPTX, PDF, скрипт сборки
├── README.md
├── README.en.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

*В дереве выше показаны основные каталоги и документы, а не полный список файлов репозитория.*

## Получение материалов

```bash
git clone -b develop https://github.com/dgavdadaev/network-modeling.git
cd network-modeling
```

Для инструментов проекта, которым нужны подмодули, используйте `git submodule update --init --recursive`. Для изучения отчёта и результатов ЛР-3 это необязательно.

## Инструменты

Python 3, Mininet, iPerf3, Linux `tc`, GNU Make, Gnuplot, Git. Презентация собирается из Markdown средствами Node.js; зависимости указаны в `labs/lab03/presentation/package.json`.

## Документация проекта

[Правила внесения изменений](CONTRIBUTING.md) · [Git-процесс](README.git-flow.md) · [Правила общения](CODE_OF_CONDUCT.md) · [Безопасность](SECURITY.md) · [English](README.en.md)

**Автор:** Авдадаев Джамал Геланиевич.  
**Репозиторий:** https://github.com/dgavdadaev/network-modeling

Материалы предназначены для учебных и демонстрационных целей.
