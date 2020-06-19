pipeline {
  agent any
  stages {
    stage('Init') {
      steps {
        notifyBuild('STARTED')
        sh "git rev-parse --short HEAD > .git/commit-id"
      }
    }
    stage('Add Environment Variable') {
      steps {
        script {
          if(env.BRANCH_NAME == 'master') {
            sh 'cp -f ../variables.production.env variables.env'
          } else {
            sh 'cp -f ../variables.staging.env variables.env'
          }
        }
      }
    }
    stage('Unit Test & Build Production Version') {
      steps {
        script {
          def sha1 = readFile('.git/commit-id').trim()
          sh "docker run --name mongo-3.6.3 -d mongo:3.6.3"
          sh "docker run --name redis-4.0.6 -d redis:4.0.6-alpine"
          sh "docker build -t videx-pre-build-$sha1:latest -f ./Dockerfile/DockerfileNodePreBuild ."
          sh "docker run --name Videx-Pre-Build-$sha1 --link mongo-3.6.3:mongodb --link redis-4.0.6:redis --env-file ./variables.env -v `pwd`/dist:/app/dist videx-pre-build-$sha1"
        }
      }
    }
    stage('Production Environment Image Build') {
      when {
        branch 'master'
      }
      steps {
        script {
          def sha1 = readFile('.git/commit-id').trim()
          sh "docker build -t ubcvidex.azurecr.io/videx-production-node:latest -t ubcvidex.azurecr.io/videx-production-node:$sha1 -f ./Dockerfile/DockerfileNodeStagingProduction ."
          sh "docker push ubcvidex.azurecr.io/videx-production-node:latest"
          sh "docker push ubcvidex.azurecr.io/videx-production-node:$sha1"
          sh "docker build -t ubcvidex.azurecr.io/videx-production-redis:latest -t ubcvidex.azurecr.io/videx-production-redis:$sha1 -f ./Dockerfile/DockerfileRedis ."
          sh "docker push ubcvidex.azurecr.io/videx-production-redis:latest"
          sh "docker push ubcvidex.azurecr.io/videx-production-redis:$sha1"
          sh "docker build -t ubcvidex.azurecr.io/videx-production-jsreport:latest -t ubcvidex.azurecr.io/videx-production-jsreport:$sha1 -f ./Dockerfile/DockerfileJsreport ."
          sh "docker push ubcvidex.azurecr.io/videx-production-jsreport:latest"
          sh "docker push ubcvidex.azurecr.io/videx-production-jsreport:$sha1"
          sh "docker rmi -f ubcvidex.azurecr.io/videx-production-node:latest"
          sh "docker rmi -f ubcvidex.azurecr.io/videx-production-node:$sha1"
          sh "docker rmi -f ubcvidex.azurecr.io/videx-production-redis:latest"
          sh "docker rmi -f ubcvidex.azurecr.io/videx-production-redis:$sha1"
          sh "docker rmi -f ubcvidex.azurecr.io/videx-production-jsreport:latest"
          sh "docker rmi -f ubcvidex.azurecr.io/videx-production-jsreport:$sha1"
        }
      }
    }
    stage('Staging Environment Deploy') {
      when {
        branch 'dev'
      }
      steps {
        sh 'docker-compose -f docker-compose-staging.yml build'
        sh 'docker-compose -f docker-compose-staging.yml down'
        sh 'docker-compose -f docker-compose-staging.yml up -d'
      }
    }
  }
  post {
    always {
      script {
        def sha1 = readFile('.git/commit-id').trim()
        sh "docker rm -f mongo-3.6.3"
        sh "docker rm -f redis-4.0.6"
        sh "docker rm -f Videx-Pre-Build-$sha1"
        sh "docker rmi -f videx-pre-build-$sha1"
        sh "docker image prune -f"
        sh "docker container prune -f"
        sh "docker volume prune -f"
        sh "sudo rm -rf *"
      }
      notifyBuild(currentBuild.result)
    }
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus = buildStatus ?: 'SUCCESS'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESS') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send Slack notifications
  slackSend (color: colorCode, message: summary)
}
