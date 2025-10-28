# Make.com AI Agent - Claude to Dropbox Integration

This directory contains resources for building a Make.com AI agent that saves Claude outputs directly to Dropbox using natural language commands.

## What This Does

Allows you to tell Claude "save this to Dropbox" in plain English, and Make.com handles the file creation automatically—no copy/paste, no app switching.

## Key Resources

### System Prompt
- **`make-ai-agent-system-prompt.md`** - The working system prompt for the Dropbox File Manager agent. Handles filename extraction/generation, content formatting, and tool calling.

### Make.com Scenario
- **`make-scenario-upload-claude-output-to-dropbox.json`** - Blueprint for the Make.com scenario that receives data from Claude and uploads to Dropbox. Configure your Dropbox connection and target folder.

### Research & Methodology
- **`claude-ai-agent-deep-research-file.md`** - Comprehensive research on Make.com AI agent architecture, prompt engineering principles, and tool-first design methodology. Essential reading for understanding how Make.com agents differ from standard LLM implementations.

### Project Instructions
- **`claude-ai-agent-project-instructions.md`** - The Claude project framework used to generate effective Make.com AI agent prompts. Includes character limits (1800-2200), compression techniques, and validation criteria.

- **`claude-project-factory-project-instructions.md`** - Meta-project for building Claude project instruction frameworks through structured interviews.

### Video Tutorial
- **`video-transcript.md`** - Full walkthrough of building and connecting this automation, including troubleshooting tips and real implementation examples.

## Quick Start

1. Read the deep research file to understand Make.com agent architecture
2. Import the scenario blueprint into Make.com
3. Configure your Dropbox connection and target folder
4. Create an AI agent in Make.com using the system prompt
5. Connect the agent to Claude via MCP server URL
6. Test with: "save this to Dropbox as [filename]"

## Key Principles

- **Tool-first design**: Agents select tools based on metadata (names/descriptions), not prompts
- **Global prompts**: Keep system prompts reusable across scenarios
- **Stateless by default**: No memory between runs unless thread IDs are passed
- **One output only**: Return scenarios can only send one variable back to Claude
