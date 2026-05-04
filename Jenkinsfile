pipeline {
    agent any

    stages {

        stage('Build Backend') {
            steps {
                dir('web/backend') {
                    sh 'docker build -t backend-app .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('web/Front-End') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
    }
}