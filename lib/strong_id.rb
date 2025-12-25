# frozen_string_literal: true

module StrongId
  extend ActiveSupport::Concern
  include ActiveModel::Validations

  ID_SIZE = 8
  REGEXP = /^[\w+\-]{8,9}$/
  private_constant :ID_SIZE, :REGEXP

  included do
    before_validation :ensure_unique_strong_id, on: :create
    before_create :ensure_unique_strong_id

    validates :strong_id, presence: true

    attr_readonly :strong_id

    if self < ActiveRecord::Base
      define_singleton_method :by_strong_id do |strong_id|
        raise ArgumentError, "Argument is not a Strong ID" unless strong_id.is_a?(String)

        find_by(strong_id:)
      end

      define_singleton_method :by_strong_id! do |strong_id|
        raise ArgumentError, "Argument is not a Strong ID" unless strong_id.is_a?(String)

        find_by!(strong_id:)
      end

      scope :by_strong_ids, ->(*strong_ids) do
        where(strong_id: strong_ids.flatten)
      end
    end
  end

  def strong_id
    self[:strong_id] || ensure_unique_strong_id
  end

  def dup = super.tap { |s| s[:strong_id] = nil }

  class_methods do
    def generate_strong_id
      SecureRandom.alphanumeric(ID_SIZE)
    end
  end
  # ensure class_methods are available on StrongId also; i.e.
  # StrongId.generate_strong_id:
  extend ClassMethods

  def self.regexp
    REGEXP
  end

  private

  def ensure_strong_id
    strong_id_nil? && assign_strong_id
  end

  def strong_id_nil?
    self[:strong_id].nil?
  end

  def assign_strong_id
    self[:strong_id] = self.class.generate_strong_id
  end

  def ensure_unique_strong_id
    return unless strong_id_nil?

    loop do
      assign_strong_id
      break unless self.class.exists?(strong_id: self[:strong_id])
    end
    self[:strong_id]
  end
end
