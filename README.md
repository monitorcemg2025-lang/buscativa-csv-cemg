# SEDUC Monitoria Escolar

## Descrição
Este projeto é uma aplicação web para gerenciar monitoria escolar, incluindo registro de horários, faltas, lista de alunos e geração de relatórios em PDF. Desenvolvido por Luiz Felipe em 2025.

## Estrutura do Projeto
- `index.html`: Página de login.
- `main.html`: Registro de horários do monitor.
- `absences.html`: Registro de faltas dos alunos.
- `students.html`: Lista de alunos com opção de copiar nomes.
- `reports.html`: Geração de relatórios em PDF.
- `css/styles.css`: Estilização global.
- `js/`: Diretório com scripts JavaScript.
  - `auth.js`: Lógica de autenticação.
  - `schedules.js`: Gerenciamento de horários.
  - `absences.js`: Gerenciamento de faltas.
  - `students.js`: Gerenciamento da lista de alunos.
  - `reports.js`: Geração de PDFs.
- `lib/`: Diretório com bibliotecas locais.
  - `jspdf.umd.min.js`: Biblioteca jsPDF (versão 2.5.1).
  - `jspdf.plugin.autotable.min.js`: Biblioteca AutoTable (versão 3.8.3).
- `data/mock-api.json`: Dados de autenticação simulados.
- `README.md`: Este arquivo.

## Como Usar
1. Clone o repositório ou copie os arquivos para um diretório local.
2. Certifique-se de ter as bibliotecas em `lib/` (baixe de https://cdnjs.com/libraries/jspdf e https://github.com/simonbengtsson/jsPDF-AutoTable).
3. Use um servidor web local (ex.: Live Server no VS Code) para testar, pois o `fetch` requer um ambiente de servidor.
4. Abra `index.html` no navegador.
5. Faça login com um dos usuários do `mock-api.json` (ex.: `Luiz` / `28012006`).
6. Navegue pelas páginas para registrar horários, faltas, visualizar alunos ou gerar relatórios.

## Dependências
- Bibliotecas locais em `lib/`.

## Notas
- O limite de armazenamento em `localStorage` é de 1000 entradas por tipo (horários e faltas).
- Os relatórios em PDF usam bibliotecas locais e incluem o nome da escola em texto normal, sem brasão.
- Para deploy no Render.com, faça um `git push` e acompanhe os logs.

## Solução de Problemas
- Se o PDF não for gerado, verifique o console (F12 > Console) e confirme que os arquivos em `lib/` estão presentes.
- Registre pelo menos um horário ou falta antes de gerar relatórios.
- Se o download for bloqueado, desative bloqueadores de pop-up ou ajuste as permissões do navegador.
