import { useState, useEffect, useCallback, useRef } from 'react'
import type { Block } from './types'
import { blockRegistry } from './blockRegistry'

const MAX_HISTORY = 50

export function useEditor(initialBlocks: any[] = []) {
  const [localBlocks, setLocalBlocks] = useState<Block[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  // Undo/Redo history
  const [history, setHistory] = useState<Block[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const skipSaveRef = useRef(false)

  // Initialize blocks when data is fetched
  useEffect(() => {
    if (initialBlocks?.length > 0 && localBlocks.length === 0) {
      const parsed = initialBlocks.map((b: any) => ({
        ...b,
        content: typeof b.content === 'string' ? JSON.parse(b.content) : b.content
      }))
      setLocalBlocks(parsed)
      setHistory([parsed])
      setHistoryIndex(0)
    }
  }, [initialBlocks])

  // Save to history for undo/redo
  const saveToHistory = useCallback((blocks: Block[]) => {
    if (skipSaveRef.current) return

    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      const updated = [...newHistory, blocks]
      return updated.slice(-MAX_HISTORY)
    })
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1))
  }, [historyIndex])

  const addBlock = useCallback((type: string) => {
    const blockDef = blockRegistry[type]
    const content = blockDef ? { ...blockDef.defaultContent } : { text: 'New content block.' }

    const newBlock: Block = {
      id: `temp-${Date.now()}`,
      type: type as any,
      content,
    }
    const newBlocks = [...localBlocks, newBlock]
    setLocalBlocks(newBlocks)
    saveToHistory(newBlocks)
    setSelectedBlockId(newBlock.id)
    setRightSidebarOpen(true)
  }, [localBlocks, saveToHistory])

  const updateBlockContent = useCallback((id: string, content: any) => {
    const newBlocks = localBlocks.map(b => b.id === id ? { ...b, content } : b)
    setLocalBlocks(newBlocks)
    saveToHistory(newBlocks)
  }, [localBlocks, saveToHistory])

  const updateBlockStyles = useCallback((id: string, styles: any) => {
    const newBlocks = localBlocks.map(b =>
      b.id === id ? { ...b, content: { ...b.content, styles } } : b
    )
    setLocalBlocks(newBlocks)
    saveToHistory(newBlocks)
  }, [localBlocks, saveToHistory])

  const removeBlock = useCallback((id: string) => {
    if (id === selectedBlockId) setSelectedBlockId(null)
    const newBlocks = localBlocks.filter(b => b.id !== id)
    setLocalBlocks(newBlocks)
    saveToHistory(newBlocks)
  }, [localBlocks, selectedBlockId, saveToHistory])

  const duplicateBlock = useCallback((id: string) => {
    const block = localBlocks.find(b => b.id === id)
    if (!block) return
    
    const index = localBlocks.findIndex(b => b.id === id)
    const newBlock: Block = {
      ...block,
      id: `temp-${Date.now()}`,
      content: JSON.parse(JSON.stringify(block.content)) // Deep clone
    }
    
    const newBlocks = [...localBlocks]
    newBlocks.splice(index + 1, 0, newBlock)
    setLocalBlocks(newBlocks)
    saveToHistory(newBlocks)
    setSelectedBlockId(newBlock.id)
  }, [localBlocks, saveToHistory])

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= localBlocks.length) return

    const newBlocks = [...localBlocks]
    const [removed] = newBlocks.splice(fromIndex, 1)
    newBlocks.splice(toIndex, 0, removed)
    setLocalBlocks(newBlocks)
    saveToHistory(newBlocks)
  }, [localBlocks, saveToHistory])

  const moveBlockUp = useCallback((index: number) => {
    if (index <= 0 || index >= localBlocks.length) return
    moveBlock(index, index - 1)
  }, [localBlocks, moveBlock])

  const moveBlockDown = useCallback((index: number) => {
    if (index < 0 || index >= localBlocks.length - 1) return
    moveBlock(index, index + 1)
  }, [localBlocks, moveBlock])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      skipSaveRef.current = true
      setHistoryIndex(historyIndex - 1)
      setLocalBlocks(history[historyIndex - 1])
      setTimeout(() => { skipSaveRef.current = false }, 0)
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      skipSaveRef.current = true
      setHistoryIndex(historyIndex + 1)
      setLocalBlocks(history[historyIndex + 1])
      setTimeout(() => { skipSaveRef.current = false }, 0)
    }
  }, [history, historyIndex])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  // Track if there are unsaved changes relative to initial data
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (initialBlocks && localBlocks.length > 0) {
      // Very simple dirty check: if history index > 0, something changed
      // Or we could do a deep comparison, but history index is a good proxy for "user did something"
      setIsDirty(historyIndex > 0)
    }
  }, [historyIndex, initialBlocks, localBlocks])

  return {
    localBlocks,
    setLocalBlocks,
    selectedBlockId,
    setSelectedBlockId,
    leftSidebarOpen,
    setLeftSidebarOpen,
    rightSidebarOpen,
    setRightSidebarOpen,
    addBlock,
    updateBlockContent,
    updateBlockStyles,
    removeBlock,
    duplicateBlock,
    moveBlock,
    moveBlockUp,
    moveBlockDown,
    undo,
    redo,
    canUndo,
    canRedo,
    isDirty,
    setIsDirty
  }
}
