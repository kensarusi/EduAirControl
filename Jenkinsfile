pipeline {
    agent any

    stages {

        stage('Build Images') {
            steps {
                dir('Web'){
                    sh 'docker compose build'
                }
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