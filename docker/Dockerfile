FROM nginx:alpine
LABEL maintainer="Derek Elder"
ENV RESUME_DOC "Derek Elder Resume.doc"
ENV RESUME_PDF "Derek Elder Resume.pdf"
ENV HTML_PATH "/usr/share/nginx/html"
COPY docker/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY home.html ${HTML_PATH}/home.html
COPY about.html ${HTML_PATH}/about.html
COPY contact.html ${HTML_PATH}/contact.html
COPY interests.html ${HTML_PATH}/interests.html
COPY resume.html ${HTML_PATH}/resume.html
COPY sol.html ${HTML_PATH}/sol.html
COPY writing.html ${HTML_PATH}/writing.html
COPY bootstrap ${HTML_PATH}/bootstrap
COPY fonts ${HTML_PATH}/fonts
COPY images ${HTML_PATH}/images
COPY jquery ${HTML_PATH}/jquery
COPY css ${HTML_PATH}/css
COPY js ${HTML_PATH}/js
COPY ${RESUME_DOC} ${HTML_PATH}/${RESUME_DOC}
COPY ${RESUME_PDF} ${HTML_PATH}/${RESUME_PDF}