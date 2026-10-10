# Network Modeling — laboratory assignments

An educational repository maintained by **Djamal Avdadaev** with practical work on computer network modeling and administration. It contains source code, experiment results, reports, and presentations.

The active working branch is [`develop`](https://github.com/dgavdadaev/network-modeling/tree/develop).

## Laboratory assignments

- [Lab 02](labs/lab02/) — course materials, report, and presentation.
- [Lab 03](labs/lab03/) — **Network throughput measurement and testing: a reproducible experiment**.

### Laboratory 03

Lab 03 implements a `h1 — s3 — h2` network using the Python API of **Mininet**, tests network connectivity, applies link constraints using **TCLink, HTB, and netem**, and runs automated **iPerf3** measurements. The workflow exports JSON, generates performance plots, and is driven by **GNU Make**.

- [Project, Makefile and measurements](labs/lab03/project/)
- [Report (Markdown)](labs/lab03/report/Лабораторная_3_Авдадаев.md) · [PDF](labs/lab03/report/Лабораторная_3_Авдадаев.pdf) · [DOCX](labs/lab03/report/Лабораторная_3_Авдадаев.docx)
- [Presentation (Markdown)](labs/lab03/presentation/Lab03_Presentation_Source.md) · [PDF](labs/lab03/presentation/Lab03_Presentation_Cambria_Calibri.pdf) · [PPTX](labs/lab03/presentation/Lab03_Presentation_Cambria_Calibri.pptx)

The observed TCP throughput was approximately **9.97 Mbps** and **35.62 Mbps** in two separate runs. The workflow was reproducible; numerical stability was not established from only two runs.

## Clone

```bash
git clone -b develop https://github.com/dgavdadaev/network-modeling.git
cd network-modeling
```

For project components requiring submodules, use `git submodule update --init --recursive`.

## Project guidelines

[Contributing](CONTRIBUTING.md) · [Git workflow](README.git-flow.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [Security](SECURITY.md) · [Русская версия](README.md)

For educational and demonstration purposes. Existing license terms are defined in [LICENSE](LICENSE).
