# frozen_string_literal: true

require "active_support/concern"

module Action
  extend ActiveSupport::Concern

  class Halt < StandardError
    attr_reader :action_object

    def initialize(action_object)
      @action_object = action_object
    end
  end

  class << self
    def define_result_methods(instance)
      instance.define_singleton_method :success do |&block|
        block&.call(instance) if instance.success?
        instance
      end

      instance.define_singleton_method :failure do |&block|
        block&.call(instance) if instance.failure?
        instance
      end

      instance
    end
  end

  def perform
    raise NotImplementedError, "To use an `::Action`, the including class must " \
    "define a #perform instance method."
  end

  class_methods do
    def perform(...)
      instance = begin
        PaperTrail.request(controller_info: {whatdunnit: name}) do
          new(...).tap(&:perform)
        end
      rescue Halt => e
        e.action_object
      end

      instance.define_singleton_method :perform do
        raise "Cannot call `#perform` method twice on an action object"
      end

      ::Action.define_result_methods(instance)

      instance
    end
  end

  def errors
    @errors ||= []
  end

  def success?
    errors.empty?
  end

  def failure?
    !success?
  end

  def success
    raise "Cannot call `#success` on an action that hasn't been performed"
  end

  def failure
    raise "Cannot call `#failure` on an action that hasn't been performed"
  end

  def chain_errors(other_action_result)
    other_action_result.failure { |action| error(action.errors) }
  end

  def resulting(&block)
    @_resulting = block
    self
  end

  def result
    @_resulting.respond_to?(:call) ? @_resulting.call(self) : self
  end

  private

  def error(*args)
    args = Array(args.first) if args.length == 1
    errors.concat args
  end

  def error!(*)
    error(*)

    raise Halt.new(self) unless errors.empty?
  end
end
