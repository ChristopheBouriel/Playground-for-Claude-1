#!/bin/bash

# Simple Git Worktree Setup for Mac
# Usage: ./setup-worktree.sh <github-issue-url>
# Example: ./setup-worktree.sh https://github.com/ChristopheBouriel/Playground-for-Claude-1/issues/2

if [ $# -eq 0 ]; then
    echo "Usage: $0 <github-issue-url>"
    echo "Example: $0 https://github.com/owner/repo/issues/123"
    exit 1
fi

ISSUE_URL=$1

# Validate GitHub issue URL format
if [[ ! "$ISSUE_URL" =~ ^https://github\.com/[^/]+/[^/]+/issues/[0-9]+$ ]]; then
    echo "Error: Invalid GitHub issue URL format"
    echo "Expected format: https://github.com/owner/repo/issues/123"
    exit 1
fi

# Generate branch name using Claude CLI
echo "🤖 Generating branch name from issue..."
CLAUDE_OUTPUT=$(claude -p "Get information about this GitHub issue using 'gh' CLI: $ISSUE_URL. Based on the issue title and description, generate a perfect git branch name. The branch name MUST follow this format: 'issue-XX-some-understanding-name' where XX is the issue number and 'some-understanding-name' is a descriptive name based on the issue content. Use lowercase letters and hyphens only, no slashes or special characters. It should be suitable as a folder name. Return ONLY the branch name, nothing else." --output-format json --dangerously-skip-permissions 2>/dev/null)
BRANCH_NAME=$(echo "$CLAUDE_OUTPUT" | jq -r '.result' 2>/dev/null)

# Check if branch name generation was successful
if [ -z "$BRANCH_NAME" ] || [ "$BRANCH_NAME" = "null" ]; then
    echo "❌ Failed to generate branch name. Using fallback..."
    # Extract issue number from URL as fallback
    ISSUE_NUMBER=$(echo "$ISSUE_URL" | grep -o '[0-9]*$')
    BRANCH_NAME="issue-$ISSUE_NUMBER"
fi

echo "📌 Generated branch name: $BRANCH_NAME"
FEATURE_NAME=$BRANCH_NAME
PROJECT_NAME=$(basename "$(pwd)")
WORKTREE_PATH="$HOME/Developer/worktrees/${PROJECT_NAME}-worktrees/$FEATURE_NAME"

echo "🚀 Setting up worktree: $FEATURE_NAME"
echo "📁 Project: $PROJECT_NAME"

# Create worktree directory
mkdir -p "$HOME/Developer/worktrees/${PROJECT_NAME}-worktrees"

# Remove existing worktree if it exists
if [ -d "$WORKTREE_PATH" ]; then
    echo "⚠️  Removing existing worktree..."
    git worktree remove "$WORKTREE_PATH" 2>/dev/null || rm -rf "$WORKTREE_PATH"
fi

# Create the worktree
echo "📦 Creating worktree..."
git worktree add -b "$FEATURE_NAME" "$WORKTREE_PATH"

# Copy env files (including nested ones)
echo "📋 Copying environment files..."
find . -name ".env*" -type f | while read -r env_file; do
    relative_path="${env_file./}"
    target_dir="$WORKTREE_PATH/$(dirname "$relative_path")"
    mkdir -p "$target_dir"
    cp "$env_file" "$target_dir/"
    echo "  📄 Copied: $relative_path"
done

# Setup worktree
cd "$WORKTREE_PATH"

# Install dependencies
if [ -f "package.json" ]; then
    echo "📥 Installing dependencies..."
    npm install
fi

echo "✅ Worktree ready at: $WORKTREE_PATH"

osascript -e 'tell application "terminal"' -e "do script \"cd $WORKTREE_PATH && claude --permission-mode plan '/task-medium $ISSUE_URL'\"" -e 'end tell'