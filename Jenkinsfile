pipeline {
    agent { 
        node {
            label 'dynamic-nodejs-agent'
            }
      }
    triggers {
        pollSCM "*/5 * * * *"
    }
    stages {
        stage('Setup') {
            steps {
                echo "Setting up build.."
                sh '''
                yarn
                '''
            }
        }
        stage('Lint') {
            steps {
                echo "Running lint.."
                sh '''
                yarn lint
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Running unit tests.."
                sh '''
                yarn test
                '''
            }
        }
        stage('Build') {
            steps {
                echo "Building application.."
                sh '''
                yarn build
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "deploying application to dev & staging environments"
                '''
            }
        }
    }
}
