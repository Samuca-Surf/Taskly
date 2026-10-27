# Sobre o Sistema

uma sistema mais simples, que irá rodar no próprio computador, um MVP, que inclua os projetos, as tarefas, as subtarefas, as categorias das tarefas, e onde essa tarefa pode ficar em Backlog, A fazer, Em andamento, Em análise, Concluído etc. tbm dará para fazer o cadastro, edição e exclusão das mesmas

projects

├── id

├── name

├── description

├── created_at

└── updated_at

statuses

├── id

├── project_id

├── name

├── color

├── position

├── created_at

└── updated_at

o que vai ter o Backlog, A Fazer, Em andamento, Em análise, e Concluído vai ser o status

categories

├── id

├── project_id

├── name

├── color

├── created_at

└── updated_at

categoria será para onde será cadastrado, Front-end, QA, Back-end, Banco, etc...

tasks

├── id

├── project_id

├── status_id

├── category_id

├── title

├── description

├── priority

├── due_date

├── position

├── created_at

└── updated_at

subtasks

├── id

├── task_id

├── title

├── completed

├── position

├── created_at

└── updated_at
