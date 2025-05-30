#!/bin/bash
cd /home/kavia/workspace/code-generation/petwellness-hub-24750-730421ee/petwellness_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

