pipeline {
    agent any

    stages {

        stage('Build Backend') {
            steps {
                dir('Web/backend') {
                    sh 'docker build -t backend-app .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Web/Front-End') {
                    sh 'docker build -t frontend-app .'
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