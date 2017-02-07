FROM    node:6.9.4

ADD build.sh /tmp/build.sh
RUN chmod 744 /tmp/build.sh

CMD /tmp/build.sh