# Sobre o Sistema

uma sistema mais simples, que irá rodar no próprio computador, um MVP, que inclua os projetos, as tarefas, as subtarefas, as categorias das tarefas, e onde essa tarefa pode ficar em Backlog, A fazer, Em andamento, Em análise, Concluído etc. tbm dará para fazer o cadastro, edição e exclusão das mesmas





projects

├── id

├── name

├── description

├── created\_at

└── updated\_at





statuses

├── id

├── project\_id

├── name

├── color

├── position

├── created\_at

└── updated\_at





categories

├── id

├── project\_id

├── name

├── color

├── created\_at

└── updated\_at





tasks

├── id

├── project\_id

├── status\_id

├── category\_id

├── title

├── description

├── priority

├── due\_date

├── position

├── created\_at

└── updated\_at





subtasks

├── id

├── task\_id

├── title

├── completed

├── position

├── created\_at

└── updated\_at



